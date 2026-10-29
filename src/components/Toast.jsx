import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [message, onClose]);
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-ink text-white px-6 py-3.5 rounded-lg font-medium z-[200] shadow-lg max-w-[calc(100%-32px)] text-center animate-[slideUp_0.3s_ease]">
      {message}
    </div>
  );
}