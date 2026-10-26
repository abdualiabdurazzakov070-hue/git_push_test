import React from 'react';
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from './Icons';

const ProductCard = ({ product, onLike, onDislike, onQuickView }) => {
  const totalVotes = (product.likes || 0) + (product.dislikes || 0);
  const likePercentage = totalVotes > 0 ? Math.round(((product.likes || 0) / totalVotes) * 100) : 100;

  return (
    <div className="product-card-pro">
      <div className="card-media-box">
        <img
          src={product.image}
          alt={product.name}
          className="card-media-img"
          loading="lazy"
        />
        <div className="card-badges">
          <span className="category-pill">{product.categoryName}</span>
          {product.badge && <span className="featured-badge">{product.badge}</span>}
        </div>

        <button
          className="btn-quick-view"
          onClick={() => onQuickView(product)}
          title="Tezkor ko'rish"
        >
          <EyeIcon size={16} />
          <span>Batafsil</span>
        </button>
      </div>

      <div className="card-content">
        <div className="card-header-row">
          <h3 className="card-product-title" onClick={() => onQuickView(product)}>
            {product.name}
          </h3>
          <div className="card-price">
            {product.currency}{product.price.toLocaleString()}
          </div>
        </div>

        <p className="card-description">{product.description}</p>

        {product.specs && (
          <div className="card-specs-list">
            {product.specs.slice(0, 3).map((spec, i) => (
              <span key={i} className="spec-tag">{spec}</span>
            ))}
          </div>
        )}

        <div className="rating-progress-wrapper">
          <div className="rating-stats-text">
            <span>Reyting: {likePercentage}%</span>
            <span>{totalVotes} ta fikr</span>
          </div>
          <div className="rating-track">
            <div
              className="rating-bar-fill"
              style={{ width: `${likePercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="card-footer-actions">
          <button
            className={`action-btn btn-like-pro ${product.userAction === 'like' ? 'active' : ''}`}
            onClick={() => onLike(product.id)}
            title="Layk bosish"
          >
            <ThumbUpIcon size={16} filled={product.userAction === 'like'} />
            <span className="count-num">{product.likes}</span>
          </button>

          <button
            className={`action-btn btn-dislike-pro ${product.userAction === 'dislike' ? 'active' : ''}`}
            onClick={() => onDislike(product.id)}
            title="Dislayk bosish"
          >
            <ThumbDownIcon size={16} filled={product.userAction === 'dislike'} />
            <span className="count-num">{product.dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
