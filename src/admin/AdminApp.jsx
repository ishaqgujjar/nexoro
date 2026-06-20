import { Routes, Route } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import AdminProducts from './AdminProducts';
import AdminProductForm from './AdminProductForm';
import AdminOrders from './AdminOrders';
import AdminMessages from './AdminMessages';
import AdminWholesale from './AdminWholesale';
import AdminReviews from './AdminReviews';
import AdminTestimonials from './AdminTestimonials';
import AdminCategories from './AdminCategories';

export default function AdminApp() {
  const { isAdmin } = useStore();
  if (!isAdmin) return <AdminLogin />;
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/:id" element={<AdminProductForm />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="wholesale" element={<AdminWholesale />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="categories" element={<AdminCategories />} />
      </Route>
    </Routes>
  );
}
