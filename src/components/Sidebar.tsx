import { Link, useLocation } from "react-router-dom";
import {
  RiDashboardLine,
  RiHistoryLine,
  RiScanLine,
  RiMenuLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: RiDashboardLine,
    },
    {
      path: "/detection",
      name: "Detection Process",
      icon: RiScanLine,
    },
    {
      path: "/history",
      name: "History",
      icon: RiHistoryLine,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed bottom-4 left-4 p-3 rounded-full bg-[#00DC82] text-white shadow-lg z-[60]"
        >
          <RiMenuLine className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobileOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-[45]"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`flex flex-col h-screen bg-[#0A1F1C] text-white transition-all duration-300 fixed md:relative z-[50]
          ${isMobile ? (isMobileOpen ? "translate-x-0" : "-translate-x-full") : ""} 
          ${isCollapsed ? "w-16" : "w-64"} ${className}`}
      >
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-[#1a2e2a]">
          {!isCollapsed && <span className="text-xl font-semibold text-white">Smart Scout</span>}
          {!isMobile && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg hover:bg-[#1a2e2a] text-white"
            >
              {isCollapsed ? (
                <IoChevronForwardOutline className="w-5 h-5" />
              ) : (
                <IoChevronBackOutline className="w-5 h-5" />
              )}
            </button>
          )}
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="p-1.5 rounded-lg hover:bg-[#1a2e2a] text-white"
            >
              <IoChevronBackOutline className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && toggleMobileMenu()}
                className={`flex items-center px-4 py-3 mb-2 transition-colors ${
                  isActive
                    ? "bg-[#00DC82] text-white"
                    : "text-gray-400 hover:bg-[#1a2e2a] hover:text-white"
                }`}
              >
                <item.icon className={`text-xl ${isCollapsed ? "mx-auto" : "mr-3"}`} />
                {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Exit Button */}
        <div className="p-4 border-t border-[#1a2e2a]">
          <Link
            to="/"
            onClick={() => isMobile && toggleMobileMenu()}
            className="flex items-center px-4 py-3 transition-colors text-gray-400 hover:bg-[#1a2e2a] hover:text-white rounded-lg"
          >
            <RiLogoutBoxLine className={`text-xl ${isCollapsed ? "mx-auto" : "mr-3"}`} />
            {!isCollapsed && <span className="text-sm whitespace-nowrap">Exit</span>}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
