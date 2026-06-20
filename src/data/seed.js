// Initial demo catalogue — mirrors the original store (5 categories, 10 products,
// 8 testimonials, sample reviews). Images are generated placeholders until you
// upload real photos from the admin panel.

export const categories = [
  { id: 'c1', name: 'Home Organization', slug: 'home-organization' },
  { id: 'c2', name: 'Fitness & Wellness', slug: 'fitness-wellness' },
  { id: 'c3', name: 'Lifestyle Accessories', slug: 'lifestyle-accessories' },
  { id: 'c4', name: 'Kitchen & Dining', slug: 'kitchen-dining' },
  { id: 'c5', name: 'Tech & Everyday', slug: 'tech-everyday' },
];

export const products = [
  {
    id: 'p1', name: 'Ember Aroma Diffuser', slug: 'ember-aroma-diffuser', categoryId: 'c3',
    tagline: 'Calm, scented ambience for any room.',
    description: 'A whisper-quiet ultrasonic diffuser with a warm ember glow and up to 10 hours of continuous mist. Pairs beautifully with your favourite essential oils to turn any space into a retreat.\n\nAuto shut-off, 300ml tank, and soft adjustable lighting.',
    price: 5499, compareAtPrice: 7299, stock: 120, isFeatured: true, isActive: true,
  },
  {
    id: 'p2', name: 'Aura Smart Water Bottle', slug: 'aura-smart-water-bottle', categoryId: 'c2',
    tagline: 'Hydration that reminds you to drink.',
    description: 'Insulated stainless-steel bottle with a subtle glow reminder and 24-hour cold retention. Keeps you on track through workouts, desk days, and travel.\n\n600ml, leak-proof, BPA-free.',
    price: 3999, compareAtPrice: null, stock: 80, isFeatured: true, isActive: true,
  },
  {
    id: 'p3', name: 'Nimbus Desk Organizer', slug: 'nimbus-desk-organizer', categoryId: 'c1',
    tagline: 'A tidy desk, a clearer mind.',
    description: 'A multi-compartment organizer in warm matte finish that keeps stationery, devices, and cables exactly where you need them. Designed to look as good as it works.',
    price: 2899, compareAtPrice: 3499, stock: 150, isFeatured: true, isActive: true,
  },
  {
    id: 'p4', name: 'Lumen LED Reading Lamp', slug: 'lumen-led-reading-lamp', categoryId: 'c5',
    tagline: 'Gentle, eye-friendly light on demand.',
    description: 'A dimmable desk lamp with three colour temperatures and a flexible neck. Touch controls and a USB-C port make late nights easy on the eyes.',
    price: 4499, compareAtPrice: null, stock: 64, isFeatured: true, isActive: true,
  },
  {
    id: 'p5', name: 'Verde Herb Garden Kit', slug: 'verde-herb-garden-kit', categoryId: 'c4',
    tagline: 'Fresh herbs on your kitchen counter.',
    description: 'Everything you need to grow basil, mint, and coriander indoors — self-watering pots, premium soil discs, and seeds. A little greenery for everyday cooking.',
    price: 3299, compareAtPrice: 3999, stock: 90, isFeatured: false, isActive: true,
  },
  {
    id: 'p6', name: 'Stride Resistance Band Set', slug: 'stride-resistance-band-set', categoryId: 'c2',
    tagline: 'A full gym that fits in a drawer.',
    description: 'Five graded resistance bands with handles, door anchor, and ankle straps. From rehab to strength training, a complete portable workout.',
    price: 2499, compareAtPrice: 3199, stock: 200, isFeatured: true, isActive: true,
  },
  {
    id: 'p7', name: 'Cove Storage Baskets (Set of 3)', slug: 'cove-storage-baskets', categoryId: 'c1',
    tagline: 'Soft structure for every shelf.',
    description: 'Woven cotton-rope baskets in three sizes with sturdy handles. Tame toys, towels, and clutter while adding warmth to any room.',
    price: 3799, compareAtPrice: null, stock: 110, isFeatured: false, isActive: true,
  },
  {
    id: 'p8', name: 'Brew Pour-Over Coffee Set', slug: 'brew-pour-over-coffee-set', categoryId: 'c4',
    tagline: 'Cafe-quality coffee, made slowly.',
    description: 'A borosilicate glass carafe, reusable stainless filter, and matching dripper. Everything for a clean, full-bodied pour-over at home.',
    price: 4899, compareAtPrice: 5999, stock: 70, isFeatured: true, isActive: true,
  },
  {
    id: 'p9', name: 'Pulse Wireless Charger Pad', slug: 'pulse-wireless-charger-pad', categoryId: 'c5',
    tagline: 'Set it down. It charges.',
    description: 'A slim 15W fast wireless pad with a soft-touch top and anti-slip base. Case-friendly and indicator-lit, it keeps your desk cable-free.',
    price: 2999, compareAtPrice: 3799, stock: 130, isFeatured: false, isActive: true,
  },
  {
    id: 'p10', name: 'Drift Weighted Blanket', slug: 'drift-weighted-blanket', categoryId: 'c3',
    tagline: 'The calm of a gentle embrace.',
    description: 'A 7kg weighted blanket with breathable cotton cover and evenly distributed glass beads. Designed to help you settle and sleep deeper.',
    price: 7999, compareAtPrice: 9499, stock: 45, isFeatured: false, isActive: true,
  },
].map((p) => ({ ...p, image: null, createdAt: new Date(Date.now() - Math.random() * 1e9).toISOString() }));

export const reviews = [
  { id: 'r1', productId: 'p1', name: 'Sana M.', rating: 5, comment: 'The glow is so soothing and the mist lasts all evening. Looks gorgeous on my shelf.', isApproved: true, createdAt: '2026-01-12T10:00:00Z' },
  { id: 'r2', productId: 'p1', name: 'Hamza R.', rating: 4, comment: 'Quiet and effective. Wish the tank were a little bigger, but lovely overall.', isApproved: true, createdAt: '2026-02-02T10:00:00Z' },
  { id: 'r3', productId: 'p2', name: 'Ayesha K.', rating: 5, comment: 'Keeps water cold the whole day and the reminder actually helps me drink more.', isApproved: true, createdAt: '2026-02-18T10:00:00Z' },
  { id: 'r4', productId: 'p3', name: 'Bilal A.', rating: 5, comment: 'My desk has never looked this clean. Sturdy and premium feeling.', isApproved: true, createdAt: '2026-01-28T10:00:00Z' },
  { id: 'r5', productId: 'p6', name: 'Zara F.', rating: 5, comment: 'Perfect for home workouts. The bands feel durable and the anchor is handy.', isApproved: true, createdAt: '2026-03-04T10:00:00Z' },
  { id: 'r6', productId: 'p8', name: 'Usman T.', rating: 4, comment: 'Makes a smooth cup. The glass feels high quality.', isApproved: true, createdAt: '2026-03-10T10:00:00Z' },
];

export const testimonials = [
  { id: 't1', name: 'Sana Malik', role: 'Verified Buyer · Karachi', rating: 5, quote: 'Every NEXORO product I have ordered feels considered and well made. Shopping here is a joy.', isActive: true },
  { id: 't2', name: 'Hamza Raza', role: 'Verified Buyer · Lahore', rating: 5, quote: 'Fast replies, honest pricing, and the quality genuinely surprised me. Highly recommended.', isActive: true },
  { id: 't3', name: 'Ayesha Khan', role: 'Verified Buyer · Islamabad', rating: 5, quote: 'Beautiful packaging and the products just work. This is my go-to for gifts now.', isActive: true },
  { id: 't4', name: 'Bilal Ahmed', role: 'Verified Buyer · Faisalabad', rating: 4, quote: 'Great everyday essentials with a premium feel. The desk organizer changed my workspace.', isActive: true },
  { id: 't5', name: 'Zara Farooq', role: 'Verified Buyer · Multan', rating: 5, quote: 'Customer support was patient and helpful. The whole experience felt trustworthy.', isActive: true },
  { id: 't6', name: 'Usman Tariq', role: 'Verified Buyer · Rawalpindi', rating: 5, quote: 'Reliable products that last. I keep coming back because the standard never drops.', isActive: true },
  { id: 't7', name: 'Mariam S.', role: 'Verified Buyer · Bhakkar', rating: 5, quote: 'Ordering was simple and the bank-transfer process was clear. Items arrived perfectly.', isActive: true },
  { id: 't8', name: 'Imran N.', role: 'Verified Buyer · Hyderabad', rating: 4, quote: 'Thoughtful design and fair prices. NEXORO has become my default for home upgrades.', isActive: true },
];
