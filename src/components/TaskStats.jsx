import { useTodos } from "../context/TodoContext.jsx";

export default function TaskStats() {
  const { stats } = useTodos();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Tasks" value={stats.total} />
        <StatCard label="Completed" value={stats.done} />
        <StatCard label="Pending" value={stats.pending} />
      </div>
      <div className="bg-white border border-line rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center text-[13px] font-semibold uppercase tracking-wide text-muted">
          <span>Overall Progress</span>
          <span className="text-navy font-bold">{stats.percent}%</span>
        </div>
        <div className="h-2 bg-[#EAE5DD] rounded-full overflow-hidden mt-3">
          <div className="h-full bg-navy rounded-full transition-all duration-500" style={{ width: `${stats.percent}%` }} />
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-line rounded-xl p-6 shadow-sm">
      <div className="text-[13px] font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div className="font-serif text-3xl font-semibold text-ink mt-2">{value}</div>
    </div>
  );
}