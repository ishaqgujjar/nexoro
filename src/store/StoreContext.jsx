import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import * as seed from '../data/seed';
import { uid, orderRef } from '../lib/format';
import { ADMIN_PASSWORD } from '../lib/constants';

const DB_KEY = 'nexoro_db_v1';
const CART_KEY = 'nexoro_cart_v1';
const ADMIN_KEY = 'nexoro_admin_v1';

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return {
    categories: seed.categories,
    products: seed.products,
    reviews: seed.reviews,
    testimonials: seed.testimonials,
    messages: [],
    wholesale: [],
    orders: [],
    orderSeq: 1,
  };
}
function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; }
}

export function StoreProvider({ children }) {
  const [db, setDb] = useState(loadDB);
  const [cart, setCart] = useState(loadCart);
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(ADMIN_KEY) === '1');
  const [toasts, setToasts] = useState([]);

  useEffect(() => { localStorage.setItem(DB_KEY, JSON.stringify(db)); }, [db]);
  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart]);

  // ---- toasts ----
  const toast = useCallback((message, type = 'success') => {
    const id = uid('t');
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  // ---- derived helpers ----
  const categoryById = useMemo(() => Object.fromEntries(db.categories.map((c) => [c.id, c])), [db.categories]);
  const approvedReviews = useCallback((pid) => db.reviews.filter((r) => r.productId === pid && r.isApproved), [db.reviews]);
  const avgRating = useCallback((pid) => {
    const rs = db.reviews.filter((r) => r.productId === pid && r.isApproved);
    if (!rs.length) return 0;
    return Math.round((rs.reduce((s, r) => s + r.rating, 0) / rs.length) * 10) / 10;
  }, [db.reviews]);
  const reviewCount = useCallback((pid) => db.reviews.filter((r) => r.productId === pid && r.isApproved).length, [db.reviews]);
  const productBySlug = useCallback((slug) => db.products.find((p) => p.slug === slug), [db.products]);

  const discountPercent = (p) =>
    p.compareAtPrice && p.compareAtPrice > p.price ? Math.round((1 - p.price / p.compareAtPrice) * 100) : 0;

  // ---- cart ----
  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([pid, v]) => {
      const product = db.products.find((p) => p.id === pid);
      return product ? { product, quantity: v.quantity, price: Number(v.price), totalPrice: Number(v.price) * v.quantity } : null;
    }).filter(Boolean);
  }, [cart, db.products]);
  const cartCount = useMemo(() => Object.values(cart).reduce((s, v) => s + v.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cartItems.reduce((s, i) => s + i.totalPrice, 0), [cartItems]);

  const addToCart = (product, quantity = 1, replace = false) => {
    setCart((c) => {
      const cur = c[product.id]?.quantity || 0;
      let q = replace ? quantity : cur + quantity;
      q = Math.max(1, Math.min(q, product.stock || 1));
      return { ...c, [product.id]: { quantity: q, price: String(product.price) } };
    });
  };
  const updateQty = (product, quantity) => {
    if (quantity <= 0) return removeFromCart(product.id);
    addToCart(product, quantity, true);
  };
  const removeFromCart = (pid) => setCart((c) => { const n = { ...c }; delete n[pid]; return n; });
  const clearCart = () => setCart({});

  // ---- products (admin) ----
  const addProduct = (p) => setDb((d) => ({ ...d, products: [{ ...p, id: uid('p'), createdAt: new Date().toISOString() }, ...d.products] }));
  const updateProduct = (id, patch) => setDb((d) => ({ ...d, products: d.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  const deleteProduct = (id) => setDb((d) => ({ ...d, products: d.products.filter((p) => p.id !== id) }));

  // ---- categories (admin) ----
  const addCategory = (c) => setDb((d) => ({ ...d, categories: [...d.categories, { ...c, id: uid('c') }] }));
  const deleteCategory = (id) => setDb((d) => ({ ...d, categories: d.categories.filter((c) => c.id !== id) }));

  // ---- reviews ----
  const addReview = (productId, { name, rating, comment }) =>
    setDb((d) => ({ ...d, reviews: [{ id: uid('r'), productId, name, rating: Number(rating), comment, isApproved: true, createdAt: new Date().toISOString() }, ...d.reviews] }));
  const toggleReviewApproved = (id) => setDb((d) => ({ ...d, reviews: d.reviews.map((r) => (r.id === id ? { ...r, isApproved: !r.isApproved } : r)) }));
  const deleteReview = (id) => setDb((d) => ({ ...d, reviews: d.reviews.filter((r) => r.id !== id) }));

  // ---- testimonials ----
  const addTestimonial = (t) => setDb((d) => ({ ...d, testimonials: [{ ...t, id: uid('t'), isActive: true, createdAt: new Date().toISOString() }, ...d.testimonials] }));
  const toggleTestimonialActive = (id) => setDb((d) => ({ ...d, testimonials: d.testimonials.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)) }));
  const deleteTestimonial = (id) => setDb((d) => ({ ...d, testimonials: d.testimonials.filter((t) => t.id !== id) }));

  // ---- messages ----
  const addMessage = (m) => setDb((d) => ({ ...d, messages: [{ ...m, id: uid('m'), isRead: false, createdAt: new Date().toISOString() }, ...d.messages] }));
  const toggleMessageRead = (id) => setDb((d) => ({ ...d, messages: d.messages.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m)) }));
  const deleteMessage = (id) => setDb((d) => ({ ...d, messages: d.messages.filter((m) => m.id !== id) }));

  // ---- wholesale ----
  const addWholesale = (w) => setDb((d) => ({ ...d, wholesale: [{ ...w, id: uid('w'), isReviewed: false, createdAt: new Date().toISOString() }, ...d.wholesale] }));
  const toggleWholesaleReviewed = (id) => setDb((d) => ({ ...d, wholesale: d.wholesale.map((w) => (w.id === id ? { ...w, isReviewed: !w.isReviewed } : w)) }));
  const deleteWholesale = (id) => setDb((d) => ({ ...d, wholesale: d.wholesale.filter((w) => w.id !== id) }));

  // ---- orders ----
  const placeOrder = (form) => {
    const items = cartItems.map((i) => ({ productId: i.product.id, productName: i.product.name, price: i.price, quantity: i.quantity }));
    const total = cartTotal;
    let created;
    setDb((d) => {
      const seq = d.orderSeq;
      created = {
        id: uid('o'), ref: orderRef(seq), ...form,
        paymentProof: form.paymentProof || null,
        total, status: form.paymentProof ? 'verifying' : 'pending',
        items, createdAt: new Date().toISOString(),
      };
      // decrement stock
      const products = d.products.map((p) => {
        const it = items.find((x) => x.productId === p.id);
        return it ? { ...p, stock: Math.max(0, p.stock - it.quantity) } : p;
      });
      return { ...d, orders: [created, ...d.orders], orderSeq: seq + 1, products };
    });
    clearCart();
    return created;
  };
  const updateOrderStatus = (id, status) => setDb((d) => ({ ...d, orders: d.orders.map((o) => (o.id === id ? { ...o, status } : o)) }));
  const deleteOrder = (id) => setDb((d) => ({ ...d, orders: d.orders.filter((o) => o.id !== id) }));

  // ---- admin auth (client-side demo gate) ----
  const login = (pw) => {
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem(ADMIN_KEY, '1'); setIsAdmin(true); return true; }
    return false;
  };
  const logout = () => { sessionStorage.removeItem(ADMIN_KEY); setIsAdmin(false); };

  const resetData = () => { localStorage.removeItem(DB_KEY); setDb(loadDB()); };

  const value = {
    ...db, cart, cartItems, cartCount, cartTotal,
    categoryById, approvedReviews, avgRating, reviewCount, productBySlug, discountPercent,
    addToCart, updateQty, removeFromCart, clearCart,
    addProduct, updateProduct, deleteProduct,
    addCategory, deleteCategory,
    addReview, toggleReviewApproved, deleteReview,
    addTestimonial, toggleTestimonialActive, deleteTestimonial,
    addMessage, toggleMessageRead, deleteMessage,
    addWholesale, toggleWholesaleReviewed, deleteWholesale,
    placeOrder, updateOrderStatus, deleteOrder,
    isAdmin, login, logout, resetData,
    toast, toasts,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
