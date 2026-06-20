import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { money } from '../lib/format';
import { placeholder } from '../lib/placeholder';
import { Toggle, Empty, confirmThen } from './ui';

export default function AdminProducts() {
  const { products, categoryById, updateProduct, deleteProduct, toast } = useStore();

  const saveField = (id, key, value) => updateProduct(id, { [key]: value });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-body text-sm">{products.length} product{products.length === 1 ? '' : 's'} · edit price & stock inline, or open a product for full details.</p>
        <Link to="/admin/products/new" className="btn-gold rounded-full px-5 py-2.5 text-sm">+ Add product</Link>
      </div>

      {products.length ? (
        <div className="bg-white border border-line rounded-2xl card-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead className="bg-cream text-body text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left font-medium px-5 py-3">Product</th>
                  <th className="text-left font-medium px-3 py-3">Category</th>
                  <th className="text-left font-medium px-3 py-3">Price (PKR)</th>
                  <th className="text-left font-medium px-3 py-3">Stock</th>
                  <th className="text-left font-medium px-3 py-3">Featured</th>
                  <th className="text-left font-medium px-3 py-3">Active</th>
                  <th className="text-right font-medium px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {products.map((p, i) => (
                  <tr key={p.id} className="hover:bg-cream/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image || placeholder(p.name, i)} alt="" className="w-11 h-11 rounded-lg object-cover bg-cream shrink-0" />
                        <div className="min-w-0"><div className="font-medium text-ink truncate max-w-[200px]">{p.name}</div><div className="text-body text-xs truncate max-w-[200px]">{p.tagline}</div></div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-body">{categoryById[p.categoryId]?.name || '—'}</td>
                    <td className="px-3 py-3">
                      <input type="number" defaultValue={p.price} onBlur={(e) => saveField(p.id, 'price', Number(e.target.value))}
                        className="w-24 bg-cream border border-line rounded-lg px-2 py-1.5 no-spin focus:outline-none focus:border-gold" />
                    </td>
                    <td className="px-3 py-3">
                      <input type="number" defaultValue={p.stock} onBlur={(e) => saveField(p.id, 'stock', Math.max(0, Number(e.target.value)))}
                        className="w-20 bg-cream border border-line rounded-lg px-2 py-1.5 no-spin focus:outline-none focus:border-gold" />
                    </td>
                    <td className="px-3 py-3"><Toggle on={p.isFeatured} onClick={() => saveField(p.id, 'isFeatured', !p.isFeatured)} labelOn="Yes" labelOff="No" /></td>
                    <td className="px-3 py-3"><Toggle on={p.isActive} onClick={() => saveField(p.id, 'isActive', !p.isActive)} labelOn="Live" labelOff="Hidden" /></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/products/${p.id}`} className="btn-outline rounded-full px-3 py-1.5 text-xs">Edit</Link>
                        <button onClick={confirmThen(`Delete “${p.name}”? This cannot be undone.`, () => { deleteProduct(p.id); toast('Product deleted.'); })}
                          className="text-red-500 hover:text-red-600 text-xs px-2 py-1.5">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : <Empty title="No products yet" sub="Add your first product to start selling." />}
    </div>
  );
}
