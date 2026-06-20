import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Toasts from './Toasts';
import useScrollReveal from './useScrollReveal';

export default function Layout() {
  useScrollReveal();
  return (
    <div className="bg-white text-ink font-sans antialiased min-h-screen flex flex-col selection:bg-accent selection:text-ink">
      <Navbar />
      <Toasts />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
