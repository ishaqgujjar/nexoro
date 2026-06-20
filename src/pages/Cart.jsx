import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { money } from '../lib/format';
import { placeholder } from '../lib/placeholder';

export default function Cart() {
  const { cartItems, cartCount, cartTotal, updateQty, removeFromCart } = useStore();

  return (
    <section className="pt-[110px] pb-24 max-w-6xl mx-auto px-5 sm:px-8">
      <h1 className="reveal font-display text-4xl sm:text-5xl mb-2 text-ink">Your Cart</h1>
      <p className="reveal text-body mb-10">{cartCount} item{cartCount === 1 ? '' : 's'} in your bag</p>

      {cartCount > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(({ product, quantity, price, totalPrice }, i) => (
              <div key={product.id} className="reveal flex gap-4 bg-white border border-line rounded-2xl p-4 card-soft">
                <Link to={`/product/${product.slug}`} className="shrink-0">
                  <img src={product.image || placeholder(product.name, i)} alt={product.name} className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-cream" />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link to={`/product/${product.slug}`} className="font-display text-lg hover:text-gold transition text-ink">{product.name}</Link>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="text-body hover:text-red-500 transition" aria-label="Remove">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 7h12M9 7V5h6v2m-7 0l1 12h6l1-12" /></svg>
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex items-center border border-line rounded-full overflow-hidden bg-cream">
                      <button onClick={() => updateQty(product, quantity - 1)} className="px-3 py-2 text-body hover:text-gold">−</button>
                      <input value={quantity} min="1" max={product.stock} onChange={(e) => updateQty(product, parseInt(e.target.value || '1'))} type="number" className="w-12 text-center bg-transparent text-ink py-2 focus:outline-none no-spin" />
                      <button onClick={() => updateQty(product, quantity + 1)} className="px-3 py-2 text-body hover:text-gold">+</button>
                    </div>
                    <div className="text-right">
                      <div className="text-ink font-semibold">{money(totalPrice)}</div>
                      <div className="text-xs text-body">{money(price)} each</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link to="/products" className="inline-flex items-center gap-2 text-gold hover:text-deep transition mt-2 text-sm font-medium">← Continue shopping</Link>
          </div>

          <div className="reveal">
            <div className="bg-white border border-line rounded-2xl p-7 sticky top-24 card-soft">
              <h3 className="font-display text-2xl mb-6 text-ink">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-body"><span>Subtotal</span><span className="text-ink">{money(cartTotal)}</span></div>
                <div className="flex justify-between text-body"><span>Shipping</span><span className="text-emerald-600">Calculated at delivery</span></div>
              </div>
              <div className="hairline my-6" />
              <div className="flex justify-between items-center mb-7">
                <span className="text-body">Total</span><span className="font-display text-2xl gold-text">{money(cartTotal)}</span>
              </div>
              <Link to="/checkout" className="btn-gold block text-center rounded-full px-6 py-4 text-sm">Proceed to Checkout</Link>
              <p className="text-xs text-body text-center mt-4">Secure manual bank transfer · Upload proof to confirm</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="reveal text-center py-24 border border-line rounded-2xl bg-cream">
          <div className="text-5xl mb-4">🛍️</div>
          <p className="font-display text-2xl text-ink">Your cart is empty</p>
          <p className="text-body mt-2">Discover products designed to elevate your everyday.</p>
          <Link to="/products" className="btn-gold inline-block rounded-full px-8 py-3.5 mt-7 text-sm">Browse Products</Link>
        </div>
      )}
    </section>
  );
}
