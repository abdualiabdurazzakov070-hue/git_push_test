import React from 'react';
import ProductCard from '../components/ProductCard';

const Products = ({ products, onLike, onDislike, onQuickView }) => {
  if (!products || products.length === 0) {
    return (
      <div className="empty-state-pro">
        <div className="empty-icon">🔍</div>
        <h3>Hech qanday mahsulot topilmadi</h3>
        <p>Qidiruv so'zini o'zgartiring yoki boshqa kategoriyani tanlang.</p>
      </div>
    );
  }

  return (
    <div className="products-grid-pro">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onLike={onLike}
          onDislike={onDislike}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default Products;
