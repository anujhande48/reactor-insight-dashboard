
import { useState } from 'react';
import { useUserSettings, type GaugeType } from '@/hooks/useUserSettings';
import { useReactorData } from '@/hooks/useReactorData';
import { useIsMobile } from '@/hooks/use-mobile';
import ReactorGauge from '@/components/ReactorGauge';
import BatchTable from '@/components/BatchTable';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bell, RefreshCw, Settings, FlaskConical, LayoutDashboard, ClipboardList, BarChart4, AlertOctagon, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const { settings } = useUserSettings();
  const { reactors, batches, isLoading } = useReactorData(settings.refreshRate);
  const [selectedGaugeType, setSelectedGaugeType] = useState<GaugeType>(settings.gaugeType);
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const location = useLocation();

  const criticalReactors = reactors.filter(reactor => reactor.status === 'critical');
  
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
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full bg-gray-50">
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
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger className="mr-2" />
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Reactor Dashboard</h1>
              </div>
              <div className="flex items-center space-x-1 md:space-x-3">
                <Button 
                  variant="outline" 
                  size={isMobile ? "icon" : "sm"}
                  className={isMobile ? "" : "flex items-center gap-1"}
                  onClick={() => setSelectedGaugeType(selectedGaugeType === 'radial' ? 'linear' : 'radial')}
                >
                  <RefreshCw className="h-4 w-4" />
                  {!isMobile && <span>Toggle Gauges</span>}
                </Button>
                
                <Button variant="outline" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-2 md:p-4">
            {/* Alerts */}
            {criticalReactors.length > 0 && (
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-2 md:space-x-3">
                  <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-700">Critical Temperature Alert</h3>
                    <p className="text-xs md:text-sm text-red-600">
                      {criticalReactors.length} {criticalReactors.length === 1 ? 'reactor has' : 'reactors have'} reached critical temperature levels. 
                      Please check {criticalReactors.map(r => r.name).join(', ')}.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-industrial-blue"></div>
              </div>
            ) : (
              <>
                {/* Reactor Gauges */}
                <section className="mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Reactor Temperature Status</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                    {reactors.map((reactor) => (
                      <ReactorGauge 
                        key={reactor.id} 
                        reactor={reactor} 
                        gaugeType={selectedGaugeType}
                      />
                    ))}
                  </div>
                </section>

                {/* Batch Table */}
                <section>
                  <div className="flex justify-between items-center mb-2 md:mb-4">
                    <h2 className="text-lg md:text-xl font-semibold">Active Batches</h2>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <RefreshCw className="h-4 w-4" />
                      {!isMobile && <span>Refresh</span>}
                    </Button>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
                    <BatchTable batches={batches} />
                  </div>
                </section>
              </>
            )}
          </main>
          
          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 p-2 md:p-3">
            <div className="flex justify-between items-center text-xs md:text-sm text-gray-500">
              <div>ReactorMon v1.0.0</div>
              <div className="flex items-center space-x-2">
                <span>Refresh: {settings.refreshRate}s</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
