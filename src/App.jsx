import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import ProductModal from './components/ProductModal';
import AddProductModal from './components/AddProductModal';
import Toast from './components/Toast';
import { getBaza, saveBaza, initialBaza } from './data/baza';
import './App.css';

const CATEGORIES = [
  { id: 'all', name: 'Barchasi' },
  { id: 'noutbuk', name: 'Noutbuklar' },
  { id: 'smartfon', name: 'Smartfonlar' },
  { id: 'planshet', name: 'Planshetlar' },
  { id: 'aksessuar', name: 'Aksessuarlar' },
];

function App() {
  const [products, setProducts] = useState(() => getBaza());
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [theme, setTheme] = useState(() => localStorage.getItem('pro_theme') || 'dark');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Mavzuni HTML body/root ga o'rnatish
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pro_theme', theme);
  }, [theme]);

  // Toast xabar chiqarish
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Mavzuni almashtirish
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Layk bosish logikasi
  const handleLike = (id) => {
    const targetProduct = products.find((p) => p.id === id);
    const updated = products.map((item) => {
      if (item.id === id) {
        if (item.userAction === 'like') {
          return {
            ...item,
            likes: Math.max(0, item.likes - 1),
            userAction: null,
          };
        }

        const newDislikes = item.userAction === 'dislike' ? Math.max(0, item.dislikes - 1) : item.dislikes;
        return {
          ...item,
          likes: item.likes + 1,
          dislikes: newDislikes,
          userAction: 'like',
        };
      }
      return item;
    });

    setProducts(updated);
    saveBaza(updated);

    // Agar modal ochiq bo'lsa uni ham yangilash
    if (selectedProduct && selectedProduct.id === id) {
      const updatedItem = updated.find((p) => p.id === id);
      setSelectedProduct(updatedItem);
    }

    if (targetProduct) {
      showToast(`👍 "${targetProduct.name}" ga layk bosildi! Baza saqlandi.`, 'success');
    }
  };

  // Dislayk bosish logikasi
  const handleDislike = (id) => {
    const targetProduct = products.find((p) => p.id === id);
    const updated = products.map((item) => {
      if (item.id === id) {
        if (item.userAction === 'dislike') {
          return {
            ...item,
            dislikes: Math.max(0, item.dislikes - 1),
            userAction: null,
          };
        }

        const newLikes = item.userAction === 'like' ? Math.max(0, item.likes - 1) : item.likes;
        return {
          ...item,
          dislikes: item.dislikes + 1,
          likes: newLikes,
          userAction: 'dislike',
        };
      }
      return item;
    });

    setProducts(updated);
    saveBaza(updated);

    if (selectedProduct && selectedProduct.id === id) {
      const updatedItem = updated.find((p) => p.id === id);
      setSelectedProduct(updatedItem);
    }

    if (targetProduct) {
      showToast(`👎 "${targetProduct.name}" ga dislayk berildi!`, 'warning');
    }
  };

  // Yangi mahsulot qo'shish
  const handleAddProduct = (newProduct) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveBaza(updated);
    showToast(`✅ "${newProduct.name}" bazaga muvaffaqiyatli qo'shildi!`, 'success');
  };

  // Bazani qayta boshlang'ich holatga tushirish
  const handleResetBaza = () => {
    if (window.confirm("Baza ma'lumotlarini boshlang'ich holatiga qaytarishni xohlaysizmi?")) {
      saveBaza(initialBaza);
      setProducts(initialBaza);
      showToast("🔄 Baza boshlang'ich holatga qaytarildi!", 'info');
    }
  };

  // Filtrlash va qidirish
  let processedProducts = products.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.categoryName && item.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Saralash (Sort)
  if (sortBy === 'likes') {
    processedProducts = [...processedProducts].sort((a, b) => b.likes - a.likes);
  } else if (sortBy === 'price-asc') {
    processedProducts = [...processedProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    processedProducts = [...processedProducts].sort((a, b) => b.price - a.price);
  }

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);
  const activeCategoryName = activeCategoryObj ? activeCategoryObj.name : 'Barchasi';
  const totalLikes = products.reduce((acc, curr) => acc + (curr.likes || 0), 0);

  return (
    <div className="pro-app">
      <Header
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalProducts={processedProducts.length}
        totalLikes={totalLikes}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onResetBaza={handleResetBaza}
      />

      <main className="pro-main">
        <Home
          products={processedProducts}
          activeCategoryName={activeCategoryName}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onLike={handleLike}
          onDislike={handleDislike}
          onQuickView={(prod) => setSelectedProduct(prod)}
        />
      </main>

      {/* Tezkor ko'rish (Quick View) Modali */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onLike={handleLike}
        onDislike={handleDislike}
      />

      {/* Yangi mahsulot qo'shish modali */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />

      {/* Toast bildirishnomasi */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <footer className="pro-footer">
        <div className="footer-content">
          <p>© 2026 TechnoBaza Pro Max — Zamonaviy Reaktiv Mahsulotlar Katalogi</p>
          <div className="footer-badges">
            <span className="footer-tag">⚡ Vite 8</span>
            <span className="footer-tag">⚛️ React 19</span>
            <span className="footer-tag">💾 Persistent LocalStorage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
