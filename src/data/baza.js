// Boshlang'ich mahsulotlar ro'yxati (Baza Pro Max)
export const initialBaza = [
  {
    id: 1,
    name: "MacBook Pro 14 M3",
    category: "noutbuk",
    categoryName: "Noutbuk",
    price: 1850,
    currency: "$",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    description: "Apple M3 chip, 16GB Unified Memory, 512GB SSD, Liquid Retina XDR displey, Space Gray.",
    specs: ["Apple M3", "16GB RAM", "512GB SSD", "120Hz XDR"],
    badge: "🔥 Top Noutbuk",
    inStock: true,
    likes: 38,
    dislikes: 2,
    userAction: null,
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    category: "smartfon",
    categoryName: "Smartfon",
    price: 1280,
    currency: "$",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    description: "A17 Pro chip (3nm), Aviatsiya darajasidagi Titanium korpus, 5x Telephoto kamera, Action tugmasi.",
    specs: ["A17 Pro", "256GB", "Titanium", "5x Zoom"],
    badge: "⚡ Yangilik",
    inStock: true,
    likes: 54,
    dislikes: 3,
    userAction: null,
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    category: "smartfon",
    categoryName: "Smartfon",
    price: 1220,
    currency: "$",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80",
    description: "Galaxy AI imkoniyatlari, Snapdragon 8 Gen 3 for Galaxy, 200MP kamera, o'rnatilgan S-Pen stilus.",
    specs: ["Snapdragon 8 Gen 3", "12GB RAM", "Galaxy AI", "S-Pen"],
    badge: "✨ AI Flagman",
    inStock: true,
    likes: 42,
    dislikes: 4,
    userAction: null,
  },
  {
    id: 4,
    name: "Lenovo Legion Pro 7i",
    category: "noutbuk",
    categoryName: "Noutbuk",
    price: 2100,
    currency: "$",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
    description: "Intel Core i9-14900HX, NVIDIA RTX 4080 (175W), 32GB DDR5, 1TB NVMe SSD, 240Hz 2K displey.",
    specs: ["Core i9 14th", "RTX 4080", "32GB RAM", "240Hz 2K"],
    badge: "🎮 O'yin Flagmani",
    inStock: true,
    likes: 29,
    dislikes: 1,
    userAction: null,
  },
  {
    id: 5,
    name: "iPad Pro 13 (M4 Chip)",
    category: "planshet",
    categoryName: "Planshet",
    price: 1299,
    currency: "$",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
    description: "Ultra Retina XDR Tandem OLED ekran, inqilobiy Apple M4 chipi, qalinligi bor-yo'g'i 5.1 mm.",
    specs: ["Apple M4", "Tandem OLED", "5.1mm Qalinlik", "256GB"],
    badge: "🚀 Ultra Yupqa",
    inStock: true,
    likes: 31,
    dislikes: 2,
    userAction: null,
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    category: "aksessuar",
    categoryName: "Aksessuar",
    price: 380,
    currency: "$",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    description: "Dunyoning eng ilg'or faol shovqinni bekor qilish (ANC) tizimi, 30 soat batareya, Hi-Res audio.",
    specs: ["ANC Pro", "30 soat", "LDAC Hi-Res", "Multipoint"],
    badge: "🎧 Best Audio",
    inStock: true,
    likes: 47,
    dislikes: 1,
    userAction: null,
  },
  {
    id: 7,
    name: "Apple Watch Ultra 2",
    category: "aksessuar",
    categoryName: "Aksessuar",
    price: 799,
    currency: "$",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    description: "49mm titan korpus, 3000 nit yorqinlik, 36 soat batareya quvvati va ikki marta urish (Double Tap) jesti.",
    specs: ["49mm Titan", "3000 nit", "GPS Dual-Freq", "100m Suvga chidamli"],
    badge: "🏔️ Ekstremal",
    inStock: true,
    likes: 26,
    dislikes: 3,
    userAction: null,
  },
  {
    id: 8,
    name: "ASUS ROG Zephyrus G16",
    category: "noutbuk",
    categoryName: "Noutbuk",
    price: 1950,
    currency: "$",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    description: "Intel Core Ultra 9, RTX 4070, 2.5K 240Hz OLED displey, alyuminiy CNC korpus, Slash Lightning.",
    specs: ["Core Ultra 9", "RTX 4070", "OLED 240Hz", "1.85 kg"],
    badge: "🔥 Yupqa Gamer",
    inStock: true,
    likes: 35,
    dislikes: 2,
    userAction: null,
  }
];

const STORAGE_KEY = "mahsulotlar_baza_pro_max";

// Bazani localStorage dan olish yoki boshlang'ich ma'lumotlarni yuklash
export const getBaza = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Bazani o'qishda xatolik:", error);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBaza));
  return initialBaza;
};

// Bazani localStorage ga saqlash
export const saveBaza = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Bazaga saqlashda xatolik:", error);
  }
};
