import { spawn } from 'node:child_process';

const children = [
  spawn('node', ['server-dist/index.js'], {
    stdio: 'inherit',
    shell: true,
  }),
  spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
  }),
];

const shutdown = () => {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

for (const child of children) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown();
      process.exit(code);
    }
  });
}
