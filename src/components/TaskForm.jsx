import { useState } from "react";

export default function TaskForm({ onAdd, placeholder = "What needs to be done?" }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onAdd(title);
    if (result && result.ok) setTitle("");
    else if (result && !result.ok) alert(result.msg);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={placeholder} className="flex-1 w-full px-4 py-3.5 rounded-lg border border-line bg-[#FAFAFA] text-ink text-base outline-none focus:border-navy focus:bg-white transition-colors" />
      <button type="submit" className="bg-navy hover:bg-navyHover text-white px-5 py-3 rounded-lg font-semibold text-[15px] transition-colors">Add Task</button>
    </form>
  );
}