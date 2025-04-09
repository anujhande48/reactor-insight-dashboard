
import Sidebar from '@/components/Sidebar';

const Batches = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-2xl font-bold text-gray-800">Batches</h1>
          <p className="text-gray-500">Manage and track all production batches</p>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Batch Management Page</h2>
              <p className="text-gray-500 mb-6">This page will contain batch creation, historical data, and detailed analysis tools.</p>
              <p className="text-sm text-gray-400">Coming soon in the next update!</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Batches;
