import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { slugify } from '../lib/format';
import { placeholder } from '../lib/placeholder';

const fileToDataUrl = (file) => new Promise((res, rej) => {
  const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file);
});

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct, toast } = useStore();
  const editing = id ? products.find((p) => p.id === id) : null;

  const [form, setForm] = useState(() => editing || {
    name: '', categoryId: categories[0]?.id || '', tagline: '', description: '',
    price: '', compareAtPrice: '', stock: 0, image: null, isFeatured: false, isActive: true,
  });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onImage = async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    set('image', await fileToDataUrl(f));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Name is required.';
    if (!form.categoryId) er.categoryId = 'Choose a category.';
    if (!form.price || Number(form.price) <= 0) er.price = 'Enter a valid price.';
    setErrors(er);
    if (Object.keys(er).length) return;

    const payload = {
      ...form,
      slug: slugify(form.name),
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
      stock: Math.max(0, Number(form.stock) || 0),
    };
    if (editing) { updateProduct(editing.id, payload); toast('Product updated.'); }
    else { addProduct(payload); toast('Product added.'); }
    navigate('/admin/products');
  };

  return (
    <div className="max-w-3xl">
      <Link to="/admin/products" className="text-gold text-sm hover:text-deep">← Back to products</Link>
      <form onSubmit={submit} className="mt-4 bg-white border border-line rounded-2xl p-7 card-soft space-y-6" noValidate>
        <h2 className="font-display text-2xl text-ink">{editing ? 'Edit product' : 'New product'}</h2>

        <div className="grid sm:grid-cols-[180px_1fr] gap-6 items-start">
          <div>
            <label className="text-xs text-body mb-1.5 block">Image</label>
            <div className="aspect-square rounded-xl overflow-hidden border border-line bg-cream">
              <img src={form.image || placeholder(form.name || 'NEXORO', 0)} alt="" className="w-full h-full object-cover" />
            </div>
            <input type="file" accept="image/*" onChange={onImage} className="mt-3 block w-full text-xs text-body file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gold file:text-white file:text-xs file:font-semibold hover:file:bg-deep file:cursor-pointer cursor-pointer" />
            {form.image && <button type="button" onClick={() => set('image', null)} className="text-red-500 text-xs mt-2">Remove image</button>}
          </div>

          <div className="space-y-4">
            <div><label className="text-xs text-body mb-1.5 block">Name</label><input className="field" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Product name" />{errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}</div>
            <div><label className="text-xs text-body mb-1.5 block">Category</label>
              <select className="field" value={form.categoryId} onChange={(e) => set('categoryId', e.target.value)}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>{errors.categoryId && <p className="text-red-600 text-xs mt-1">{errors.categoryId}</p>}
            </div>
            <div><label className="text-xs text-body mb-1.5 block">Tagline</label><input className="field" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} placeholder="Short one-line description" /></div>
          </div>
        </div>

        <div><label className="text-xs text-body mb-1.5 block">Description</label><textarea className="field min-h-[140px]" value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Full product description" /></div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="text-xs text-body mb-1.5 block">Price ($)</label><input type="number" className="field no-spin" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="0" />{errors.price && <p className="text-red-600 text-xs mt-1">{errors.price}</p>}</div>
          <div><label className="text-xs text-body mb-1.5 block">Compare-at price</label><input type="number" className="field no-spin" value={form.compareAtPrice || ''} onChange={(e) => set('compareAtPrice', e.target.value)} placeholder="Optional" /></div>
          <div><label className="text-xs text-body mb-1.5 block">Stock</label><input type="number" className="field no-spin" value={form.stock} onChange={(e) => set('stock', e.target.value)} placeholder="0" /></div>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-ink cursor-pointer"><input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} className="accent-gold w-4 h-4" /> Featured on home</label>
          <label className="flex items-center gap-2 text-sm text-ink cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} className="accent-gold w-4 h-4" /> Active (visible in store)</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="btn-gold rounded-full px-7 py-3 text-sm">{editing ? 'Save changes' : 'Add product'}</button>
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-outline rounded-full px-7 py-3 text-sm">Cancel</button>
        </div>
      </form>
    </div>
  );
}
