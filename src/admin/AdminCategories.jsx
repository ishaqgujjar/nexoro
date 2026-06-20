import { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { slugify } from '../lib/format';
import { Empty, confirmThen } from './ui';

export default function AdminCategories() {
  const { categories, products, addCategory, deleteCategory, toast } = useStore();
  const [name, setName] = useState('');
  const count = (cid) => products.filter((p) => p.categoryId === cid).length;

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCategory({ name: name.trim(), slug: slugify(name) });
    setName(''); toast('Category added.');
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <form onSubmit={submit} className="bg-white border border-line rounded-2xl card-soft p-6 space-y-4 sticky top-24">
          <h3 className="font-display text-xl text-ink">Add category</h3>
          <input className="field" placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} />
          {name && <p className="text-body text-xs">Slug: <span className="font-mono text-deep">{slugify(name) || '—'}</span></p>}
          <button className="btn-gold rounded-full px-6 py-3 text-sm w-full">Add category</button>
        </form>
      </div>
      <div className="lg:col-span-2">
        {categories.length ? (
          <div className="bg-white border border-line rounded-2xl card-soft divide-y divide-line">
            {categories.map((c) => (
              <div key={c.id} className="px-5 py-4 flex items-center justify-between">
                <div><div className="font-medium text-ink">{c.name}</div><div className="text-body text-xs font-mono">{c.slug}</div></div>
                <div className="flex items-center gap-4">
                  <span className="text-body text-xs">{count(c.id)} product{count(c.id) === 1 ? '' : 's'}</span>
                  <button onClick={confirmThen(`Delete category “${c.name}”? Products keep their category id but it will show as unassigned.`, () => { deleteCategory(c.id); toast('Category deleted.'); })} className="text-red-500 hover:text-red-600 text-xs">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : <Empty title="No categories" sub="Add a category to organise your products." />}
      </div>
    </div>
  );
}
