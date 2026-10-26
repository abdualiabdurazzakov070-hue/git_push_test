import React from 'react';
import { CloseIcon, ThumbUpIcon, ThumbDownIcon } from './Icons';

const ProductModal = ({ product, onClose, onLike, onDislike }) => {
  if (!product) return null;

  const totalVotes = (product.likes || 0) + (product.dislikes || 0);
  const likePercentage = totalVotes > 0 ? Math.round(((product.likes || 0) / totalVotes) * 100) : 100;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Yopish">
          <CloseIcon size={20} />
        </button>

        <div className="modal-body">
          <div className="modal-image-wrapper">
            <img src={product.image} alt={product.name} className="modal-image" />
            {product.badge && <span className="modal-badge">{product.badge}</span>}
          </div>

          <div className="modal-details">
            <div className="modal-category">{product.categoryName}</div>
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-price">
              {product.currency}{product.price.toLocaleString()}
            </div>

            <p className="modal-description">{product.description}</p>

            {product.specs && (
              <div className="modal-specs">
                <h4>Asosiy xususiyatlar:</h4>
                <div className="specs-grid">
                  {product.specs.map((spec, idx) => (
                    <span key={idx} className="spec-pill">{spec}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-rating-bar-container">
              <div className="rating-info">
                <span>Reyting darajasi: <strong>{likePercentage}% ijobiy</strong></span>
                <span className="total-votes">{totalVotes} ta ovoz</span>
              </div>
              <div className="rating-bar">
                <div className="rating-fill" style={{ width: `${likePercentage}%` }}></div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className={`btn-reaction-pro like ${product.userAction === 'like' ? 'active' : ''}`}
                onClick={() => onLike(product.id)}
              >
                <ThumbUpIcon size={18} filled={product.userAction === 'like'} />
                <span>Layk ({product.likes})</span>
              </button>

              <button
                className={`btn-reaction-pro dislike ${product.userAction === 'dislike' ? 'active' : ''}`}
                onClick={() => onDislike(product.id)}
              >
                <ThumbDownIcon size={18} filled={product.userAction === 'dislike'} />
                <span>Dislayk ({product.dislikes})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
