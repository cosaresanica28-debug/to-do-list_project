export default function UserGuide() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-[26px] font-semibold text-ink mb-1">User Guide</h1>
        <p className="text-muted text-[15px]">How to use the ToDoList app.</p>
      </div>
      <div className="bg-white border border-line rounded-xl p-6 md:p-8 shadow-sm">
        <ol className="list-decimal ml-5 space-y-4 text-muted leading-relaxed">
          <li><b className="text-ink">Dashboard:</b> See your total, completed, pending tasks, and recently added tasks.</li>
          <li><b className="text-ink">Task Groups:</b> Create a category such as "School", "Personal", etc.</li>
          <li><b className="text-ink">Open a Group:</b> Click "View Tasks" to open the group.</li>
          <li><b className="text-ink">Add a Task:</b> Type your task and click "Add Task".</li>
          <li><b className="text-ink">Complete a Task:</b> Click the box next to a task.</li>
          <li><b className="text-ink">Change Status:</b> Click a completed task again to mark it as Pending.</li>
          <li><b className="text-ink">Clear Completed:</b> Use the button to remove all finished tasks at once.</li>
          <li><b className="text-ink">Delete:</b> Click the trash icon to remove a task or group.</li>
          <li><b className="text-ink">Auto-save:</b> Everything saves to your browser automatically.</li>
        </ol>
      </div>
    </div>
  );
}