export const BRAND = {
  name: 'NEXORO',
  tagline: 'Innovative Products for Everyday Life',
  email: 'info@nexoro.site',
  website: 'https://nexoro.site',
};

export const PAYMENT_DETAILS = {
  bank_name: 'WISE Bank',
  account_title: 'CLOKNET LLC',
  account_number: '510837837751775',
  iban: 'PK00 SCBL **83 **** **** 4455',
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
