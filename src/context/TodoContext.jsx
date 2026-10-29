import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "todolist.react.v1";
const TodoContext = createContext(null);

export function useTodos() {
  return useContext(TodoContext);
}

const seedGroups = () => [
  { id: "g1", name: "School Activities", createdAt: Date.now() },
  { id: "g2", name: "Personal Tasks", createdAt: Date.now() },
  { id: "g3", name: "Projects", createdAt: Date.now() },
  { id: "g4", name: "Daily Tasks", createdAt: Date.now() },
];

export function TodoProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setGroups(parsed.groups || []);
        setTasks(parsed.tasks || []);
      } else {
        setGroups(seedGroups());
      }
    } catch (err) {
      console.warn("Failed to load data:", err);
      setGroups(seedGroups());
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ groups, tasks }));
    } catch (err) {
      console.warn("Failed to save data:", err);
    }
  }, [groups, tasks, loaded]);

  const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const addGroup = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return { ok: false, msg: "Please enter a group name." };
    const exists = groups.some((g) => g.name.toLowerCase() === trimmed.toLowerCase());
    if (exists) return { ok: false, msg: "This group already exists!" };

    setGroups((prev) => [...prev, { id: genId(), name: trimmed, createdAt: Date.now() }]);
    return { ok: true, msg: "Group created!" };
  };

  const deleteGroup = (id) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setTasks((prev) => prev.filter((t) => t.groupId !== id));
  };

  const addTask = (groupId, title) => {
    const trimmed = title.trim();
    if (!trimmed) return { ok: false, msg: "Please enter a task." };

    setTasks((prev) => [
      ...prev,
      { id: genId(), groupId, title: trimmed, done: false, createdAt: Date.now() },
    ]);
    return { ok: true, msg: "Task added!" };
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompletedInGroup = (groupId) => {
    setTasks((prev) => prev.filter((t) => !(t.groupId === groupId && t.done)));
  };

  const getGroupTasks = (groupId) => tasks.filter((t) => t.groupId === groupId);
  const getGroup = (groupId) => groups.find((g) => g.id === groupId);

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.done).length,
    pending: tasks.filter((t) => !t.done).length,
    percent: tasks.length === 0 ? 0 : Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100),
  };

  const recentTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

  return (
    <TodoContext.Provider value={{
      groups, tasks, stats, recentTasks, addGroup, deleteGroup,
      addTask, toggleTask, deleteTask, clearCompletedInGroup,
      getGroupTasks, getGroup
    }}>
      {children}
    </TodoContext.Provider>
  );
}