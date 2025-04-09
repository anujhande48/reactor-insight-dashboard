
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';

const Reactors = () => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center">
              <SidebarTrigger className="mr-2" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Reactors</h1>
            </div>
            <p className="text-gray-500">Detailed view of all reactors</p>
          </header>
          
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h2 className="text-xl font-semibold mb-4">Reactor Details Page</h2>
                <p className="text-gray-500 mb-6">This page will contain detailed information, controls, and history for each reactor.</p>
                <p className="text-sm text-gray-400">Coming soon in the next update!</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Reactors;
