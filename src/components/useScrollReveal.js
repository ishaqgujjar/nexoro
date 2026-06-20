import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Adds the `in` class to every `.reveal` element as it scrolls into view.
export default function useScrollReveal() {
  const location = useLocation();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    // reveal anything already in view on load
    requestAnimationFrame(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9) el.classList.add('in');
      });
    });
    return () => io.disconnect();
  }, [location.pathname]);
}
