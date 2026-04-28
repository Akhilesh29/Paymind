import React from 'react';
import type { Offer } from '../data/offers';
import { upiApps } from '../data/offers';

interface Props {
  offers: Offer[];
  bestOfferId?: string;
  generateLink: (appId: string) => string;
}

const OfferTable: React.FC<Props> = ({ offers, bestOfferId, generateLink }) => {
  const getAppName = (appId: string) => {
    return upiApps.find(a => a.id === appId)?.name || appId;
  };

  return (
    <div className="offers-list">
      {offers.map((offer) => {
        const isBest = offer.appId === bestOfferId;
        return (
          <div key={`${offer.appId}-${offer.amount}`} className={`offer-card ${isBest ? 'best' : ''}`}>
            {isBest && <div className="best-badge">🏆 Best Deal</div>}
            
            <div className="offer-header">
              <h3 className="app-name">{getAppName(offer.appId)}</h3>
              <span className={`offer-type offer-type-${offer.type.toLowerCase().replace(' ', '-')}`}>
                {offer.type}
              </span>
            </div>

            <div className="offer-body">
              <div className="cashback-amount">
                <span className="label">Cashback:</span>
                <span className="amount">₹{offer.cashback}</span>
              </div>
            </div>

            <button
              className="pay-now-btn"
              onClick={() => {
                const link = generateLink(offer.appId);
                window.location.href = link;
              }}
            >
              Pay Now →
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default OfferTable;
