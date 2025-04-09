
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  FlaskConical,
  ClipboardList,
  LogOut,
  AlertOctagon,
  BarChart4
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      name: "Reactors", 
      path: "/reactors", 
      icon: <FlaskConical className="w-5 h-5" /> 
    },
    { 
      name: "Batches", 
      path: "/batches", 
      icon: <ClipboardList className="w-5 h-5" /> 
    },
    { 
      name: "Analytics", 
      path: "/analytics", 
      icon: <BarChart4 className="w-5 h-5" /> 
    },
    { 
      name: "Alerts", 
      path: "/alerts", 
      icon: <AlertOctagon className="w-5 h-5" /> 
    },
    { 
      name: "Settings", 
      path: "/settings", 
      icon: <Settings className="w-5 h-5" /> 
    }
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 h-screen flex flex-col ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-industrial-blue" />
            <span className="font-bold text-lg text-industrial-blue">ReactorMon</span>
          </div>
        )}
        {collapsed && (
          <FlaskConical className="h-6 w-6 text-industrial-blue mx-auto" />
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex flex-col flex-grow overflow-y-auto">
        <div className="p-4">
          {!collapsed && user && (
            <div className="mb-4 flex items-center">
              <div className="w-8 h-8 rounded-full bg-industrial-blue text-white flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-2">
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-industrial-blue text-white"
                    : "hover:bg-gray-100"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <span className="inline-block">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-gray-100 w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
