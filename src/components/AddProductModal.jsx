import React, { useState } from 'react';
import { CloseIcon, PlusIcon } from './Icons';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'noutbuk',
    price: '',
    image: '',
    description: '',
    specs: '',
    badge: '⚡ Yangi',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert("Iltimos, mahsulot nomi va narxini kiriting!");
      return;
    }

    const categoryNames = {
      noutbuk: "Noutbuk",
      smartfon: "Smartfon",
      planshet: "Planshet",
      aksessuar: "Aksessuar",
    };

    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      categoryName: categoryNames[formData.category] || "Boshqa",
      price: Number(formData.price),
      currency: "$",
      image: formData.image.trim() || "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80",
      description: formData.description.trim() || "Yangi qo'shilgan mahsulot tavsifi.",
      specs: formData.specs ? formData.specs.split(',').map((s) => s.trim()).filter(Boolean) : ["Yangi avlod"],
      badge: formData.badge || "⚡ Yangi",
      inStock: true,
      likes: 0,
      dislikes: 0,
      userAction: null,
    };

    onAdd(newProduct);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content add-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Bazaga yangi mahsulot qo'shish</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <CloseIcon size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label>Mahsulot nomi:</label>
            <input
              type="text"
              placeholder="Masalan: Xiaomi 14 Ultra"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Kategoriya:</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="noutbuk">Noutbuk</option>
                <option value="smartfon">Smartfon</option>
                <option value="planshet">Planshet</option>
                <option value="aksessuar">Aksessuar</option>
              </select>
            </div>

            <div className="form-group">
              <label>Narxi ($):</label>
              <input
                type="number"
                placeholder="Masalan: 890"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Rasm URL (ixtiyoriy):</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Xususiyatlar (vergul bilan ajrating):</label>
            <input
              type="text"
              placeholder="16GB RAM, 512GB, Snapdragon 8s Gen 3"
              value={formData.specs}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Qisqacha tavsif:</label>
            <textarea
              rows="3"
              placeholder="Mahsulot haqida qisqacha ma'lumot..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Bekor qilish
            </button>
            <button type="submit" className="btn-submit">
              <PlusIcon size={16} /> Bazaga saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
