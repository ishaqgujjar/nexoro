import { useStore } from '../store/StoreContext';
import { fmtDate } from '../lib/format';
import { Toggle, Empty, confirmThen } from './ui';

export default function AdminMessages() {
  const { messages, toggleMessageRead, deleteMessage, toast } = useStore();
  return (
    <div className="space-y-4">
      <p className="text-body text-sm">{messages.filter((m) => !m.isRead).length} unread of {messages.length} message{messages.length === 1 ? '' : 's'}.</p>
      {messages.length ? messages.map((m) => (
        <div key={m.id} className={`bg-white border rounded-2xl card-soft p-5 ${m.isRead ? 'border-line' : 'border-gold/40'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {!m.isRead && <span className="w-2 h-2 rounded-full bg-gold" />}
                <span className="font-medium text-ink">{m.name}</span>
                <a href={`mailto:${m.email}`} className="text-gold text-sm hover:text-deep">{m.email}</a>
              </div>
              {m.subject && <div className="text-sm text-ink mt-1 font-medium">{m.subject}</div>}
              <p className="text-body text-sm mt-2 leading-relaxed whitespace-pre-line">{m.message}</p>
              <div className="text-body text-xs mt-3">{fmtDate(m.createdAt)}</div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <Toggle on={m.isRead} onClick={() => toggleMessageRead(m.id)} labelOn="Read" labelOff="Unread" />
              <button onClick={confirmThen('Delete this message?', () => { deleteMessage(m.id); toast('Message deleted.'); })} className="text-red-500 hover:text-red-600 text-xs">Delete</button>
            </div>
          </div>
        </div>
      )) : <Empty title="No messages" sub="Customer messages from the contact form will appear here." />}
    </div>
  );
}
