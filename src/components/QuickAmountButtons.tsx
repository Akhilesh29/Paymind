import React from 'react';

interface Props {
  amounts: number[];
  selected: number;
  onSelect: (amount: number) => void;
}

const QuickAmountButtons: React.FC<Props> = ({ amounts, selected, onSelect }) => {
  return (
    <div className="quick-amounts">
      <label className="quick-label">Quick Amounts:</label>
      <div className="amount-buttons">
        {amounts.map((amount) => (
          <button
            key={amount}
            className={`amount-btn ${selected === amount ? 'active' : ''}`}
            onClick={() => onSelect(amount)}
          >
            ₹{amount}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAmountButtons;
