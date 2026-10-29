export default function ConfirmModal({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      <div className="bg-white border border-line rounded-xl p-6 max-w-sm w-full shadow-2xl text-center">
        <div className="w-14 h-14 rounded-full bg-dangerBg text-danger flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
        </div>
        <h2 className="font-serif text-[22px] font-semibold text-ink mb-3">{title}</h2>
        <p className="text-muted text-[15px] leading-relaxed mb-8">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 bg-white border border-line text-ink px-4 py-3 rounded-lg font-semibold hover:bg-[#F2EFE9] transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 bg-danger hover:bg-[#7A3737] text-white px-4 py-3 rounded-lg font-semibold transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}