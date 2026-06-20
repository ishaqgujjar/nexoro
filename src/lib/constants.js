export const BRAND = {
  name: 'NEXORO',
  tagline: 'Innovative Products for Everyday Life',
  email: 'info@nexoro.site',
  website: 'https://nexoro.site',
};

export const PAYMENT_DETAILS = {
  bank_name: 'Standard Chartered Bank',
  account_title: 'NEXORO Private Limited',
  account_number: '0100 2233 4455 6677',
  iban: 'PK00 SCBL 0000 0011 2233 4455',
  currency: 'USD',
};

// Client-side only gate for the demo admin (no backend).
export const ADMIN_PASSWORD = 'admin12345';

export const ORDER_STATUSES = [
  ['pending', 'Pending — awaiting payment proof'],
  ['verifying', 'Verifying payment'],
  ['paid', 'Paid'],
  ['shipped', 'Shipped'],
  ['completed', 'Completed'],
  ['cancelled', 'Cancelled'],
];
