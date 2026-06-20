# NEXORO — React Storefront (100% Frontend)

A pure front-end React rebuild of the NEXORO store — same design, same features, same
admin panel, **no backend**. All data (products, cart, orders, reviews, messages,
wholesale applications) is stored in your browser via `localStorage`, so the whole
thing runs as a static site.

## Tech
- React 18 + Vite
- React Router 6
- Tailwind CSS 3
- Browser `localStorage` as the data store (no server, no database)

## Getting started
```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```
Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Storefront
- Home, Products (filter / search / sort), Product detail (with reviews), About,
  Contact, Wholesale, Cart, Checkout, Order success.
- Manual bank-transfer checkout: customers can upload a payment screenshot, which is
  saved with the order and viewable in the admin panel.

## Admin panel
Open **`/admin`** and sign in.

- **Demo password:** `admin12345`

From the dashboard you can:
- **Products** — add / edit / delete, upload product images, set price, compare-at
  price, stock, featured and active flags (price & stock are editable inline).
- **Orders** — view items + shipping, change order status, preview payment proof, delete.
- **Messages** — read / mark / delete contact messages.
- **Wholesale** — review / delete wholesale applications.
- **Reviews** — approve / unapprove / delete (only approved reviews show on the store).
- **Testimonials** — add / show-hide / delete (drives the home page marquee).
- **Categories** — add / delete.

## Where data lives
Everything persists in your browser under the `nexoro_db_v1` key. This means:
- Data is per-browser / per-device. It is **not** shared between visitors.
- Clearing your browser data (or using a different browser) resets the store to the
  seed catalogue.
- To reset on purpose, clear site data, or call `resetData()` (exposed in the store).

## Things you'll likely want to edit
- **Bank / payment details:** `src/lib/constants.js` → `PAYMENT_DETAILS`.
- **Brand info (email, site):** `src/lib/constants.js` → `BRAND`.
- **Admin password:** `src/lib/constants.js` → `ADMIN_PASSWORD`.
- **Starting catalogue:** `src/data/seed.js`.
- **Logo:** replace `public/nexoro_logo.png`, `public/nexoro_logo_dark.png`,
  `public/favicon.png` (keep the same filenames).

## A note on the admin password
This is a **client-side demo gate**, not real security — anyone with the code can read
it. It exists so the demo behaves like the original. For a real protected admin you'd
need a backend or an auth provider.

Product images use elegant generated placeholders until you upload real photos from the
admin (uploads are stored as data URLs in the browser).
