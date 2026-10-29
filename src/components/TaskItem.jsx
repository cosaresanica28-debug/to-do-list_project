export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center gap-3 px-4 py-4 bg-white border border-line rounded-lg">
      <button onClick={() => onToggle(task.id)} aria-label={task.done ? "Mark as not done" : "Mark as done"} className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${task.done ? "bg-navy border-navy text-white" : "bg-white border-muted text-transparent"}`}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="M4.5 12.75l6 6 9-13.5" /></svg>
      </button>
      <span className={`flex-1 break-words text-[15px] sm:text-base font-medium ${task.done ? "line-through text-muted opacity-70" : "text-ink"}`}>{task.title}</span>
      <button onClick={() => onDelete(task.id)} aria-label="Delete task" className="bg-dangerBg border border-[#F0CECE] text-danger px-2.5 py-2 rounded-lg hover:bg-[#FCE8E8] transition-colors flex-shrink-0">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
      </button>
    </li>
  );
}