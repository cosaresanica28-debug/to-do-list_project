import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TaskGroups from "./pages/TaskGroups.jsx";
import GroupTasks from "./pages/GroupTasks.jsx";
import UserGuide from "./pages/UserGuide.jsx";
import Developers from "./pages/Developers.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/groups" element={<TaskGroups />} />
        <Route path="/groups/:groupId" element={<GroupTasks />} />
        <Route path="/guide" element={<UserGuide />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}