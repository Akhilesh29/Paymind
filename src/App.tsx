import { useEffect, useState } from 'react';
import './App.css';
import { UPI_APPS, CATEGORIES } from './data/upiData';

const offerTypeLabels: Record<string, string> = {
  cashback: 'cashback',
  scratch: 'scratch card',
  coins: 'coins',
  none: 'no offer'
};

type CashbackResult = {
  app: (typeof UPI_APPS)[number];
  cashbackAmount: number;
};

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function calculateCashback(
  app: (typeof UPI_APPS)[number],
  categoryId: string,
  amount: number,
) {
  const cashbackData = app.cashback[categoryId as keyof typeof app.cashback];
  if (!cashbackData) return 0;

  if ('pct' in cashbackData && typeof cashbackData.pct === 'number' && cashbackData.pct > 0) {
    return Math.min(
      Math.round((cashbackData.pct / 100) * amount),
      cashbackData.max || 999999,
    );
  }

  if ('flat' in cashbackData && typeof cashbackData.flat === 'number' && cashbackData.flat > 0) {
    return Math.min(cashbackData.flat, Math.floor(amount * 0.5));
  }

  return 0;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('recharge');
  const [amount, setAmount] = useState<string>('');
  const [results, setResults] = useState<CashbackResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!CATEGORIES.some((category) => category.id === selectedCategory) && CATEGORIES[0]) {
      setSelectedCategory(CATEGORIES[0].id);
    }
  }, [selectedCategory]);

  const handleCompare = () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const calculated = UPI_APPS.map((app) => ({
      app,
      cashbackAmount: calculateCashback(app, selectedCategory, amountNum),
    })).sort((a, b) => b.cashbackAmount - a.cashbackAmount);

    setResults(calculated);
    setShowResults(true);

    setTimeout(() => {
      const resultsEl = document.getElementById('results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const openApp = (app: (typeof UPI_APPS)[number]) => {
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isMobile && app.upi && (app.upi.startsWith('upi://') || app.upi.includes('://'))) {
      try {
        window.location.href = app.upi;
        setTimeout(() => {
          if (app.url) {
            window.open(app.url, '_blank');
          }
        }, 1200);
      } catch {
        if (app.url) {
          window.open(app.url, '_blank');
        }
      }
      return;
    }

    if (app.url) {
      window.open(app.url, '_blank');
    }
  };

  const selectedCategoryMeta =
    CATEGORIES.find((category) => category.id === selectedCategory) || CATEGORIES[0];
  const amountNumber = parseFloat(amount) || 0;
  const bestResult = results[0];

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <div className="container">
        <header className="topbar">
          <a className="brandmark" href="/">
            <span className="brandmark-icon">P</span>
            <span className="brandmark-text">Paymind</span>
          </a>
        </header>

        <section className="hero-panel hero-panel-single">
          <div className="hero-copy-block">
            <div className="eyebrow">smart UPI compare</div>
            <h1 className="hero-title">Compare cashback, pick the best UPI app.</h1>
            <p className="hero-description">
              Simple comparison, instant redirect to the highest cashback offer.
            </p>

            <div className="stat-grid">
              <div className="stat-card">
                <strong>{UPI_APPS.length}</strong>
                <span>apps compared</span>
              </div>
              <div className="stat-card">
                <strong>{CATEGORIES.length}</strong>
                <span>categories tracked</span>
              </div>
              <div className="stat-card">
                <strong>direct</strong>
                <span>redirect flow</span>
              </div>
            </div>
          </div>
        </section>

        <section className="surface">
          <div className="section-head">
            <div>
              <div className="eyebrow">offer engine</div>
              <h2>Find the best route before you pay</h2>
            </div>
            <div className="section-tag">instant comparison</div>
          </div>

          <div className="category-row">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`pill-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setShowResults(false);
                }}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="calculator-grid calculator-grid-single">
            <div className="amount-card">
              <label className="field amount-field">
                <span>Payment amount</span>
                <div className="currency-shell">
                  <span>₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(event) => {
                      setAmount(event.target.value);
                      setShowResults(false);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleCompare();
                      }
                    }}
                    placeholder="0"
                    min="1"
                  />
                </div>
              </label>

              <div className="quick-row">
                {[99, 199, 499, 999, 1999, 4999].map((value) => (
                  <button
                    key={value}
                    className="quick-pill"
                    onClick={() => {
                      setAmount(String(value));
                      setShowResults(false);
                    }}
                  >
                    {formatCurrency(value)}
                  </button>
                ))}
              </div>

              <button className="primary-button compare-action" onClick={handleCompare}>
                Compare cashback
              </button>
            </div>
          </div>
        </section>

        {showResults && results.length > 0 && (
          <section id="results" className="surface results-surface">
            <div className="section-head">
              <div>
                <div className="eyebrow">best outcome</div>
                <h2>
                  {selectedCategoryMeta?.name} for {formatCurrency(amountNumber)}
                </h2>
              </div>
              {bestResult && bestResult.cashbackAmount > 0 && (
                <div className="section-tag accent">
                  Best saving: {formatCurrency(bestResult.cashbackAmount)}
                </div>
              )}
            </div>

            {bestResult && bestResult.cashbackAmount > 0 ? (
              <div className="highlight-banner">
                <div>
                  <div className="card-kicker">top recommendation</div>
                  <h3>
                    Use {bestResult.app.name} and save up to {formatCurrency(bestResult.cashbackAmount)}
                  </h3>
                  <p>{bestResult.app.cashback[selectedCategory as keyof typeof bestResult.app.cashback]?.label || 'Best available offer for this amount.'}</p>
                </div>
                <button className="ghost-button solid" onClick={() => openApp(bestResult.app)}>
                  Open app
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <h3>No cashback detected for this amount</h3>
                <p>Try another category or amount and Paymind will recalculate the best route.</p>
              </div>
            )}

            <div className="result-grid">
              {results.map((result, index) => {
                const offerType = result.app.cashback[selectedCategory as keyof typeof result.app.cashback]?.type || 'none';
                const isBest = index === 0 && result.cashbackAmount > 0;

                return (
                  <article key={result.app.id} className={`result-card ${isBest ? 'best' : ''}`}>
                    <div className="result-card-top">
                      <div
                        className="result-logo"
                        style={{
                          background: result.app.colors.bg,
                          color: result.app.colors.text,
                        }}
                      >
                        <img 
                          src={result.app.logo} 
                          alt={result.app.name}
                          style={{
                            width: '32px',
                            height: '32px',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                      <div className="result-meta">
                        <h3>{result.app.name}</h3>
                        <p>{result.app.cashback[selectedCategory as keyof typeof result.app.cashback]?.label || 'Standard UPI payment'}</p>
                      </div>
                      <div className="result-value">
                        <strong>{formatCurrency(result.cashbackAmount)}</strong>
                        <span>estimated</span>
                      </div>
                    </div>

                    <div className="result-footer">
                      <span className={`offer-chip ${offerType}`}>{offerTypeLabels[offerType]}</span>
                      <div className="result-actions">
                        <button className="ghost-button" onClick={() => openApp(result.app)}>
                          Pay now
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
