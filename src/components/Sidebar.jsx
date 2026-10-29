import { NavLink } from "react-router-dom";

const linkBase = "flex items-center gap-3 px-3.5 py-3 rounded-lg text-[15px] font-medium transition-colors";
const inactive = "text-muted hover:bg-[#F2EFE9] hover:text-ink";
const active = "bg-[#EAE5DD] text-navy font-semibold";

const navItems = [
  { to: "/", label: "Dashboard", icon: <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" /> },
  { to: "/groups", label: "Task Groups", icon: <path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /> },
  { to: "/guide", label: "User Guide", icon: <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /> },
  { to: "/developers", label: "Developers", icon: <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /> },
];

export default function Sidebar({ mobileOpen, closeMobile }) {
  return (
    <aside className={`bg-white border-r border-line w-[280px] max-w-[85%] md:w-[260px] flex flex-col p-6 z-50 md:sticky md:top-0 md:h-screen md:translate-x-0 fixed top-0 left-0 h-full transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center text-white flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.75l6 6 9-13.5" /></svg>
        </div>
        <div>
          <span className="block font-serif font-semibold text-ink leading-tight">ToDoList</span>
          <span className="block text-xs text-muted font-medium">Task Manager</span>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={closeMobile} className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}