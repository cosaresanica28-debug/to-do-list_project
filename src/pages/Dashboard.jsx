import { Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TaskStats from "../components/TaskStats.jsx";

export default function Dashboard() {
  const { recentTasks, getGroup } = useTodos();

  return (
    <div>
      <div className="bg-navy text-paper rounded-xl p-6 md:p-9 mb-6 shadow-md">
        <h1 className="font-serif text-2xl md:text-[28px] font-semibold mb-2">Welcome back!</h1>
        <p className="text-[#D3DCE6] text-sm md:text-[15px] mb-6 max-w-2xl">Organize your day, one task at a time. Everything you add is saved automatically in your browser.</p>
        <Link to="/groups" className="inline-flex items-center justify-center gap-2 bg-paper text-navy px-5 py-3 rounded-lg font-semibold hover:bg-white transition-colors w-full sm:w-auto">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" /></svg> Add a Task
        </Link>
      </div>
      <TaskStats />
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-serif text-xl font-semibold text-ink mb-4">Recently Added Tasks</h2>
        {recentTasks.length === 0 ? (
          <p className="text-muted italic">No tasks yet. Click "Add a Task" above to get started.</p>
        ) : (
          <ul>
            {recentTasks.map((t) => (
              <li key={t.id} className="py-4 border-b border-line last:border-b-0 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className={`font-semibold text-[15px] break-words ${t.done ? "line-through text-muted opacity-60" : "text-ink"}`}>{t.title}</div>
                  <div className="text-[13px] text-muted mt-1">{getGroup(t.groupId)?.name || "Unknown"}</div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded flex-shrink-0 ${t.done ? "bg-[#E8F0EA] text-[#3B5D44]" : "bg-[#F4EFE6] text-[#8B6B3E]"}`}>{t.done ? "Done" : "Pending"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <QuickLink to="/groups" label="Manage Groups" />
        <QuickLink to="/guide" label="User Guide" />
        <QuickLink to="/developers" label="Meet the Team" />
      </div>
    </div>
  );
}

function QuickLink({ to, label }) {
  return (
    <Link to={to} className="bg-white border border-line rounded-xl px-4 py-4 text-center font-semibold text-navy hover:bg-[#F2EFE9] transition-colors">{label} →</Link>
  );
}