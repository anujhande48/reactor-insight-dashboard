
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { LayoutDashboard, Settings, FlaskConical, ClipboardList, LogOut, AlertOctagon, BarChart4 } from 'lucide-react';

const AppSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
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

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-6 w-6 text-industrial-blue" />
          <span className="font-bold text-lg text-industrial-blue">ReactorMon</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {user && (
          <div className="p-4 mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-industrial-blue text-white flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-2">
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
            </div>
          </div>
        )}
        
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === item.path}
                tooltip={item.name}
              >
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <SidebarMenuButton 
            onClick={logout}
            tooltip="Logout"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
