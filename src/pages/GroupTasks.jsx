import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskItem from "../components/TaskItem.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import Toast from "../components/Toast.jsx";

export default function GroupTasks() {
  const { groupId } = useParams();
  const { getGroup, getGroupTasks, addTask, toggleTask, deleteTask, clearCompletedInGroup } = useTodos();
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");
  const [confirm, setConfirm] = useState({ open: false, type: null, id: null });

  const group = getGroup(groupId);

  if (!group) {
    return (
      <div className="text-center py-16">
        <h1 className="font-serif text-2xl font-semibold text-ink mb-2">Group Not Found</h1>
        <p className="text-muted mb-6">The group you are looking for does not exist or has been deleted.</p>
        <Link to="/groups" className="bg-navy text-white px-5 py-3 rounded-lg font-semibold hover:bg-navyHover transition-colors">
          Back to Groups
        </Link>
      </div>
    );
  }

  const allTasks = getGroupTasks(group.id);
  const doneCount = allTasks.filter((t) => t.done).length;
  const pendingCount = allTasks.length - doneCount;

  const visibleTasks = allTasks.filter((t) => {
    if (filter === "pending") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  const handleAdd = (title) => {
    const res = addTask(group.id, title);
    if (res.ok) setToast(res.msg);
    return res;
  };

  const handleConfirmDelete = () => {
    if (confirm.type === "task") {
      deleteTask(confirm.id);
      setToast("Task deleted.");
    } else if (confirm.type === "clear") {
      clearCompletedInGroup(group.id);
      setToast("Completed tasks cleared.");
    }
    setConfirm({ open: false, type: null, id: null });
  };

  return (
    <div>
      <Link to="/groups" className="inline-flex items-center gap-1.5 text-navy font-semibold text-[15px] mb-5 hover:underline">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Groups
      </Link>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif text-[26px] font-semibold text-ink">{group.name}</h1>
        <div className="text-sm font-medium text-muted bg-white px-4 py-2 rounded-lg border border-line shadow-sm">
          <span className="text-navy font-bold">{doneCount}</span> done • <span className="text-ink font-bold">{pendingCount}</span> pending
        </div>
      </div>

      <div className="bg-white border border-line rounded-xl p-6 shadow-sm mb-6">
        <TaskForm onAdd={handleAdd} />
      </div>

      <div className="flex items-center justify-between mb-4 overflow-x-auto pb-1">
        <div className="flex gap-2">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors border ${
                filter === f
                  ? "bg-navy text-white border-navy"
                  : "bg-transparent text-muted border-transparent hover:bg-[#EAE5DD]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {doneCount > 0 && (
          <button
            onClick={() => setConfirm({ open: true, type: "clear", id: null })}
            className="text-sm font-semibold text-danger hover:underline whitespace-nowrap ml-2"
          >
            Clear Completed
          </button>
        )}
      </div>

      <ul className="flex flex-col gap-3">
        {visibleTasks.length === 0 ? (
          <p className="text-muted italic text-center py-8 bg-white border border-line rounded-xl">
            No tasks to show.
          </p>
        ) : (
          visibleTasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onToggle={toggleTask}
              onDelete={(id) => setConfirm({ open: true, type: "task", id })}
            />
          ))
        )}
      </ul>

      <ConfirmModal
        open={confirm.open}
        title={confirm.type === "clear" ? "Clear Completed?" : "Delete Task?"}
        message={confirm.type === "clear" ? "Remove all completed tasks in this group?" : "Are you sure you want to remove this task?"}
        onCancel={() => setConfirm({ open: false, type: null, id: null })}
        onConfirm={handleConfirmDelete}
      />

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}