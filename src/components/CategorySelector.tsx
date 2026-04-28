import React from 'react';
import type { Category } from '../data/offers';

interface Props {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CategorySelector: React.FC<Props> = ({ categories, selectedId, onSelect }) => {
  return (
    <div className="category-selector">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`category-btn ${selectedId === cat.id ? 'active' : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          {/* Placeholder icon – replace with actual SVGs */}
          <span className="icon">{cat.name.charAt(0)}</span>
          <span className="name">{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
