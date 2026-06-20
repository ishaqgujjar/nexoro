import { PAYMENT_DETAILS } from './constants';

export const money = (n) =>
  `$${Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export const slugify = (s) =>
  s.toString().toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const uid = (p = 'id') => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const orderRef = (seq) => `NX-${String(seq).padStart(5, '0')}`;
