import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import Toast from "../components/Toast.jsx";

export default function TaskGroups() {
  const { groups, addGroup, deleteGroup, getGroupTasks } = useTodos();
  const [name, setName] = useState("");
  const [toast, setToast] = useState("");
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const handleCreate = (e) => {
    e.preventDefault();
    const result = addGroup(name);
    setToast(result.msg);
    if (result.ok) setName("");
  };

  const handleConfirmDelete = () => {
    deleteGroup(confirm.id);
    setConfirm({ open: false, id: null });
    setToast("Group deleted.");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-[26px] font-semibold text-ink mb-1">Task Groups</h1>
        <p className="text-muted text-[15px]">Organize your tasks into categories.</p>
      </div>
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm mb-6">
        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. School Projects" className="flex-1 px-4 py-3.5 rounded-lg border border-line bg-[#FAFAFA] text-base outline-none focus:border-navy focus:bg-white transition-colors" />
          <button type="submit" className="bg-navy hover:bg-navyHover text-white px-5 py-3 rounded-lg font-semibold text-[15px] transition-colors inline-flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" /></svg> Create
          </button>
        </form>
      </div>

      {groups.length === 0 ? (
        <div className="bg-white border border-line rounded-xl p-10 text-center text-muted italic shadow-sm">No groups yet. Create one above to get started.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g) => {
            const gTasks = getGroupTasks(g.id);
            const gDone = gTasks.filter((t) => t.done).length;
            return (
              <div key={g.id} className="bg-white border border-line rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-serif text-lg font-semibold text-ink">{g.name}</div>
                  <div className="text-sm text-muted mt-1.5 mb-5">{gTasks.length} task{gTasks.length === 1 ? "" : "s"} ({gDone} done)</div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/groups/${g.id}`} className="flex-1 bg-navy hover:bg-navyHover text-white text-center px-4 py-3 rounded-lg font-semibold text-[15px] transition-colors">View Tasks</Link>
                  <button onClick={() => setConfirm({ open: true, id: g.id })} aria-label="Delete group" className="bg-dangerBg border border-[#F0CECE] text-danger px-3 py-2 rounded-lg hover:bg-[#FCE8E8] transition-colors flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ConfirmModal open={confirm.open} title="Delete Group?" message="Are you sure you want to delete this group? All tasks inside it will also be permanently removed." onCancel={() => setConfirm({ open: false, id: null })} onConfirm={handleConfirmDelete} />
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}