import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-[#0a1f1c] text-white">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="min-h-full bg-[#0a1f1c]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
