import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomBytes, randomUUID } from 'node:crypto';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

type OfferType = 'cashback' | 'scratch' | 'coins' | 'none';

type CashbackRule = {
  label: string;
  type: OfferType;
  pct?: number;
  max?: number;
  flat?: number;
};

type Category = {
  id: string;
  name: string;
  icon: string;
};

type UpiApp = {
  id: string;
  name: string;
  short: string;
  colors: {
    bg: string;
    text: string;
  };
  url: string;
  upi: string;
  cashback: Record<string, CashbackRule>;
};

type OfferStore = {
  meta: {
    updatedAt: string;
  };
  categories: Category[];
  apps: UpiApp[];
};

type User = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  lastLoginAt: string;
};

type Session = {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
};

type OtpRequest = {
  phone: string;
  code: string;
  name?: string;
  requestedAt: string;
  expiresAt: string;
};

type SavingsEntry = {
  id: string;
  userId: string;
  amount: number;
  cashbackAmount: number;
  categoryId: string;
  categoryName: string;
  appId: string;
  appName: string;
  createdAt: string;
};

type AuditEvent = {
  id: string;
  actorType: 'user' | 'admin' | 'system';
  actorId: string;
  action: string;
  detail: string;
  createdAt: string;
};

type WeeklyUpdateRun = {
  id: string;
  ranAt: string;
  summary: string;
};

type WeeklySchedule = {
  enabled: boolean;
  cadence: string;
  dayOfWeek: string;
  runAt: string;
  lastRunAt: string | null;
  nextRunAt: string;
};

type AdminDashboard = {
  analytics: {
    totalUsers: number;
    activeSessions: number;
    totalTransactions: number;
    totalSavings: number;
    topCategory: string;
    topApp: string;
  };
  audit: AuditEvent[];
  weeklyUpdates: WeeklyUpdateRun[];
  schedule: WeeklySchedule & { totalRuns: number };
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'server', 'data');
const OFFERS_FILE = join(DATA_DIR, 'offers.json');
const USERS_FILE = join(DATA_DIR, 'users.json');
const SESSIONS_FILE = join(DATA_DIR, 'sessions.json');
const OTP_FILE = join(DATA_DIR, 'otp-requests.json');
const SAVINGS_FILE = join(DATA_DIR, 'savings.json');
const AUDIT_FILE = join(DATA_DIR, 'audit.json');
const WEEKLY_UPDATES_FILE = join(DATA_DIR, 'weekly-updates.json');
const SCHEDULE_FILE = join(DATA_DIR, 'schedule.json');
const PORT = Number(process.env.PORT || 3001);
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14;
const OTP_TTL_MS = 1000 * 60 * 5;

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-session-token',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
};

async function ensureFile<T>(filePath: string, defaultValue: T) {
  try {
    await access(filePath);
  } catch {
    await writeJson(filePath, defaultValue);
  }
}

async function ensureDataFiles() {
  await mkdir(DATA_DIR, { recursive: true });
  await ensureFile<User[]>(USERS_FILE, []);
  await ensureFile<Session[]>(SESSIONS_FILE, []);
  await ensureFile<OtpRequest[]>(OTP_FILE, []);
  await ensureFile<SavingsEntry[]>(SAVINGS_FILE, []);
  await ensureFile<AuditEvent[]>(AUDIT_FILE, []);
  await ensureFile<WeeklyUpdateRun[]>(WEEKLY_UPDATES_FILE, []);
  await ensureFile<WeeklySchedule>(SCHEDULE_FILE, {
    enabled: true,
    cadence: 'weekly',
    dayOfWeek: 'Monday',
    runAt: '09:00 IST',
    lastRunAt: null,
    nextRunAt: nextWeeklyRunIso(),
  });
}

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

async function writeJson<T>(filePath: string, value: T) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function nextWeeklyRunIso() {
  const nextRun = new Date();
  nextRun.setDate(nextRun.getDate() + 7);
  return nextRun.toISOString();
}

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.writeHead(statusCode, jsonHeaders);
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(chunk as Buffer);
  }

  if (chunks.length === 0) {
    return {} as Record<string, unknown>;
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as Record<string, unknown>;
}

function sanitizePhone(phone: unknown) {
  return String(phone || '').replace(/\D/g, '').slice(-10);
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function createToken() {
  return randomBytes(24).toString('hex');
}

function getAuthToken(req: IncomingMessage) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  const sessionHeader = req.headers['x-session-token'];
  return typeof sessionHeader === 'string' ? sessionHeader : '';
}

async function appendAudit(actorType: AuditEvent['actorType'], actorId: string, action: string, detail: string) {
  const audit = await readJson<AuditEvent[]>(AUDIT_FILE);
  audit.unshift({
    id: randomUUID(),
    actorType,
    actorId,
    action,
    detail,
    createdAt: new Date().toISOString(),
  });
  await writeJson(AUDIT_FILE, audit.slice(0, 1000));
}

async function resolveSession(req: IncomingMessage) {
  const token = getAuthToken(req);
  if (!token) return null;

  const sessions = await readJson<Session[]>(SESSIONS_FILE);
  const users = await readJson<User[]>(USERS_FILE);
  const session = sessions.find((entry) => entry.token === token && Date.parse(entry.expiresAt) > Date.now());
  if (!session) {
    return null;
  }

  const user = users.find((entry) => entry.id === session.userId);
  if (!user) {
    return null;
  }

  return { token, session, user };
}

function summarizeAnalytics(savings: SavingsEntry[], users: User[], sessions: Session[]): AdminDashboard['analytics'] {
  const categoryTotals = new Map<string, number>();
  const appTotals = new Map<string, number>();
  let totalSavings = 0;

  for (const entry of savings) {
    totalSavings += entry.cashbackAmount;
    categoryTotals.set(entry.categoryName, (categoryTotals.get(entry.categoryName) || 0) + entry.cashbackAmount);
    appTotals.set(entry.appName, (appTotals.get(entry.appName) || 0) + entry.cashbackAmount);
  }

  const topCategory =
    [...categoryTotals.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 'No tracked category yet';
  const topApp = [...appTotals.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 'No tracked app yet';

  return {
    totalUsers: users.length,
    activeSessions: sessions.filter((entry) => Date.parse(entry.expiresAt) > Date.now()).length,
    totalTransactions: savings.length,
    totalSavings,
    topCategory,
    topApp,
  };
}

function sanitizeRule(body: Record<string, unknown>): CashbackRule {
  const nextRule: CashbackRule = {
    label: String(body.label || ''),
    type: ['cashback', 'scratch', 'coins', 'none'].includes(String(body.type))
      ? (String(body.type) as OfferType)
      : 'none',
  };

  if (body.pct !== undefined && body.pct !== null && body.pct !== '') {
    nextRule.pct = Number(body.pct);
  }

  if (body.max !== undefined && body.max !== null && body.max !== '') {
    nextRule.max = Number(body.max);
  }

  if (body.flat !== undefined && body.flat !== null && body.flat !== '') {
    nextRule.flat = Number(body.flat);
  }

  return nextRule;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, jsonHeaders);
    res.end();
    return;
  }

  try {
    if (req.method === 'GET' && url.pathname === '/api/health') {
      const [store, users, sessions, savings] = await Promise.all([
        readJson<OfferStore>(OFFERS_FILE),
        readJson<User[]>(USERS_FILE),
        readJson<Session[]>(SESSIONS_FILE),
        readJson<SavingsEntry[]>(SAVINGS_FILE),
      ]);

      sendJson(res, 200, {
        status: 'ok',
        brand: 'Paymind',
        updatedAt: store.meta?.updatedAt || null,
        apps: store.apps.length,
        categories: store.categories.length,
        users: users.length,
        savingsTracked: savings.length,
        activeSessions: sessions.filter((entry) => Date.parse(entry.expiresAt) > Date.now()).length,
      });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/store') {
      const store = await readJson<OfferStore>(OFFERS_FILE);
      sendJson(res, 200, store);
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/auth/request-otp') {
      const body = await readJsonBody(req);
      const phone = sanitizePhone(body.phone);
      const name = String(body.name || '').trim();

      if (phone.length !== 10) {
        sendJson(res, 400, { error: 'Enter a valid 10-digit mobile number.' });
        return;
      }

      const otpRequests = await readJson<OtpRequest[]>(OTP_FILE);
      const code = generateOtp();
      const nextRequest: OtpRequest = {
        phone,
        code,
        name,
        requestedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + OTP_TTL_MS).toISOString(),
      };

      const filtered = otpRequests.filter((entry) => entry.phone !== phone);
      filtered.unshift(nextRequest);
      await writeJson(OTP_FILE, filtered);
      await appendAudit('system', phone, 'otp.requested', `OTP requested for ${phone}`);

      sendJson(res, 200, {
        success: true,
        message: 'OTP generated for development mode.',
        devOtp: code,
        expiresAt: nextRequest.expiresAt,
      });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/auth/verify-otp') {
      const body = await readJsonBody(req);
      const phone = sanitizePhone(body.phone);
      const otp = String(body.otp || '').trim();
      const requestedName = String(body.name || '').trim();

      const [otpRequests, users, sessions] = await Promise.all([
        readJson<OtpRequest[]>(OTP_FILE),
        readJson<User[]>(USERS_FILE),
        readJson<Session[]>(SESSIONS_FILE),
      ]);

      const request = otpRequests.find((entry) => entry.phone === phone);
      if (!request || request.code !== otp || Date.parse(request.expiresAt) < Date.now()) {
        sendJson(res, 400, { error: 'OTP is invalid or expired.' });
        return;
      }

      let user = users.find((entry) => entry.phone === phone);
      const effectiveName = requestedName || request.name || 'Paymind User';

      if (!user) {
        user = {
          id: randomUUID(),
          name: effectiveName,
          phone,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };
        users.unshift(user);
      } else {
        user = {
          ...user,
          name: user.name || effectiveName,
          lastLoginAt: new Date().toISOString(),
        };
      }

      const token = createToken();
      const session: Session = {
        token,
        userId: user.id,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
      };

      const nextUsers = users.map((entry) => (entry.id === user?.id ? user : entry));
      if (!users.some((entry) => entry.id === user?.id)) {
        nextUsers.unshift(user);
      }

      await Promise.all([
        writeJson(USERS_FILE, nextUsers),
        writeJson(SESSIONS_FILE, [session, ...sessions.filter((entry) => entry.userId !== user?.id)].slice(0, 500)),
        writeJson(OTP_FILE, otpRequests.filter((entry) => entry.phone !== phone)),
      ]);
      await appendAudit('user', user.id, 'auth.verified', `OTP verified for ${phone}`);

      sendJson(res, 200, { token, user });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/session') {
      const resolved = await resolveSession(req);
      if (!resolved) {
        sendJson(res, 401, { error: 'Session not found.' });
        return;
      }

      sendJson(res, 200, { user: resolved.user, session: resolved.session });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/account/summary') {
      const resolved = await resolveSession(req);
      if (!resolved) {
        sendJson(res, 401, { error: 'Unauthorized.' });
        return;
      }

      const savings = await readJson<SavingsEntry[]>(SAVINGS_FILE);
      const history = savings
        .filter((entry) => entry.userId === resolved.user.id)
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

      const totalSavings = history.reduce((sum, entry) => sum + entry.cashbackAmount, 0);
      const topCategory =
        [...new Map(history.map((entry) => [entry.categoryName, history.filter((item) => item.categoryName === entry.categoryName).length])).entries()]
          .sort((a, b) => b[1] - a[1])[0]?.[0] || 'No payments yet';

      sendJson(res, 200, {
        user: resolved.user,
        totals: {
          trackedPayments: history.length,
          totalSavings,
          averageSavings: history.length ? Math.round(totalSavings / history.length) : 0,
          topCategory,
        },
        history: history.slice(0, 20),
      });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/savings/record') {
      const resolved = await resolveSession(req);
      if (!resolved) {
        sendJson(res, 401, { error: 'Unauthorized.' });
        return;
      }

      const body = await readJsonBody(req);
      const store = await readJson<OfferStore>(OFFERS_FILE);
      const app = store.apps.find((entry) => entry.id === String(body.appId || ''));
      const category = store.categories.find((entry) => entry.id === String(body.categoryId || ''));

      if (!app || !category) {
        sendJson(res, 400, { error: 'App or category not found.' });
        return;
      }

      const entry: SavingsEntry = {
        id: randomUUID(),
        userId: resolved.user.id,
        amount: Number(body.amount || 0),
        cashbackAmount: Number(body.cashbackAmount || 0),
        categoryId: category.id,
        categoryName: category.name,
        appId: app.id,
        appName: app.name,
        createdAt: new Date().toISOString(),
      };

      const savings = await readJson<SavingsEntry[]>(SAVINGS_FILE);
      savings.unshift(entry);
      await writeJson(SAVINGS_FILE, savings.slice(0, 5000));
      await appendAudit('user', resolved.user.id, 'savings.recorded', `Tracked ${app.name} for ${category.name}`);

      sendJson(res, 200, { success: true, entry });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/admin/dashboard') {
      const [users, sessions, savings, audit, weeklyUpdates, schedule] = await Promise.all([
        readJson<User[]>(USERS_FILE),
        readJson<Session[]>(SESSIONS_FILE),
        readJson<SavingsEntry[]>(SAVINGS_FILE),
        readJson<AuditEvent[]>(AUDIT_FILE),
        readJson<WeeklyUpdateRun[]>(WEEKLY_UPDATES_FILE),
        readJson<WeeklySchedule>(SCHEDULE_FILE),
      ]);

      const dashboard: AdminDashboard = {
        analytics: summarizeAnalytics(savings, users, sessions),
        audit: audit.slice(0, 12),
        weeklyUpdates: weeklyUpdates.slice(0, 8),
        schedule: {
          ...schedule,
          totalRuns: weeklyUpdates.length,
        },
      };

      sendJson(res, 200, dashboard);
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/admin/weekly-update/run') {
      const body = await readJsonBody(req);
      const summary = String(body.summary || 'Weekly cashback offer refresh completed.');
      const [weeklyUpdates, schedule] = await Promise.all([
        readJson<WeeklyUpdateRun[]>(WEEKLY_UPDATES_FILE),
        readJson<WeeklySchedule>(SCHEDULE_FILE),
      ]);

      const run: WeeklyUpdateRun = {
        id: randomUUID(),
        ranAt: new Date().toISOString(),
        summary,
      };

      weeklyUpdates.unshift(run);
      await writeJson(WEEKLY_UPDATES_FILE, weeklyUpdates.slice(0, 200));

      const nextSchedule: WeeklySchedule = {
        ...schedule,
        lastRunAt: run.ranAt,
        nextRunAt: nextWeeklyRunIso(),
      };
      await writeJson(SCHEDULE_FILE, nextSchedule);
      await appendAudit('admin', 'local-admin', 'offers.weekly-update', summary);

      sendJson(res, 200, { success: true, run, schedule: nextSchedule });
      return;
    }

    const offerMatch = req.method === 'PUT'
      ? url.pathname.match(/^\/api\/offers\/([^/]+)\/([^/]+)$/)
      : null;

    if (offerMatch) {
      const [, appId, categoryId] = offerMatch;
      const store = await readJson<OfferStore>(OFFERS_FILE);
      const body = await readJsonBody(req);
      const nextRule = sanitizeRule(body);
      const appIndex = store.apps.findIndex((entry) => entry.id === appId);

      if (appIndex === -1) {
        sendJson(res, 404, { error: 'App not found.' });
        return;
      }

      store.apps[appIndex] = {
        ...store.apps[appIndex],
        cashback: {
          ...store.apps[appIndex].cashback,
          [categoryId]: nextRule,
        },
      };
      store.meta = {
        ...(store.meta || {}),
        updatedAt: new Date().toISOString(),
      };

      await writeJson(OFFERS_FILE, store);
      await appendAudit('admin', 'local-admin', 'offers.updated', `${appId}/${categoryId} updated`);
      sendJson(res, 200, store);
      return;
    }

    sendJson(res, 404, { error: 'Route not found.' });
  } catch (error) {
    sendJson(res, 500, {
      error: 'Server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

await ensureDataFiles();

server.listen(PORT, () => {
  console.log(`Paymind API listening on http://localhost:${PORT}`);
});
