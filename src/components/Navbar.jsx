import React from 'react';
import { SearchIcon, HeartIcon, PlusIcon, SunIcon, MoonIcon, RefreshIcon, CloseIcon } from './Icons';

const CATEGORY_ICONS = {
  all: "⚡",
  noutbuk: "💻",
  smartfon: "📱",
  planshet: "📟",
  aksessuar: "🎧",
};

const Navbar = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  totalProducts,
  totalLikes,
  theme,
  onToggleTheme,
  onOpenAddModal,
  onResetBaza,
}) => {
  return (
    <header className="navbar-pro-header">
      <div className="navbar-top-row">
        <div className="navbar-brand-section">
          <div className="brand-logo-icon">✨</div>
          <div>
            <div className="brand-name">
              <span>Techno</span>
              <span className="gradient-text">Baza</span>
              <span className="pro-badge">PRO MAX</span>
            </div>
            <p className="brand-subtitle">Smartfon, Noutbuk va Gadjetlar Boshqaruvi</p>
          </div>
        </div>

        <div className="navbar-search-box">
          <SearchIcon size={16} className="search-icon-inside" />
          <input
            type="text"
            className="search-input"
            placeholder="Noutbuk yoki telefon qidirish..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button className="search-clear-btn" onClick={() => onSearchChange('')}>
              <CloseIcon size={14} />
            </button>
          )}
        </div>

        <div className="navbar-actions-group">
          <div className="stats-pill" title="Jami to'plangan layklar">
            <HeartIcon size={16} filled={true} className="heart-pulse-icon" />
            <span>{totalLikes}</span>
          </div>

          <button
            className="btn-add-gadget"
            onClick={onOpenAddModal}
            title="Bazaga yangi mahsulot qo'shish"
          >
            <PlusIcon size={16} />
            <span className="btn-text">Qo'shish</span>
          </button>

          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
          >
            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          <button
            className="btn-icon-secondary"
            onClick={onResetBaza}
            title="Bazani boshlang'ich holatga qaytarish"
          >
            <RefreshIcon size={16} />
          </button>
        </div>
      </div>

      <div className="navbar-bottom-row">
        <div className="category-scroll-wrapper">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`category-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span className="cat-emoji">{CATEGORY_ICONS[cat.id] || "📦"}</span>
                <span>{cat.name}</span>
                {isActive && <span className="cat-count-dot"></span>}
              </button>
            );
          })}
        </div>

        <div className="navbar-results-badge">
          <span>{totalProducts} ta mahsulot</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
