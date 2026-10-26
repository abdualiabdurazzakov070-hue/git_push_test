import React from 'react';
import Products from './Products';

const Home = ({
  products,
  activeCategoryName,
  sortBy,
  onSortChange,
  onLike,
  onDislike,
  onQuickView,
}) => {
  return (
    <div className="home-container-pro">
      <div className="catalog-toolbar">
        <div className="toolbar-left">
          <h2 className="toolbar-title">{activeCategoryName}</h2>
          <span className="toolbar-counter">{products.length} ta mavjud</span>
        </div>

        <div className="toolbar-right">
          <label className="sort-label">Saralash:</label>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="default">✨ Odatiy (Tavsiya)</option>
            <option value="likes">🔥 Eng ko'p layk to'plagan</option>
            <option value="price-asc">💵 Narx: Arzondan qimmatga</option>
            <option value="price-desc">💎 Narx: Qimmatdan arzonga</option>
          </select>
        </div>
      </div>

      <Products
        products={products}
        onLike={onLike}
        onDislike={onDislike}
        onQuickView={onQuickView}
      />
    </div>
  );
};

export default Home;
