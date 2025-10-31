import { useState } from 'react';
import { BarChart3, Users, CheckSquare, FileText,ChartNoAxesGantt, LayoutDashboard } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ClientManagement from './pages/ClientManagement';
import TaskWorkflow from './pages/TaskWorkflow.jsx';
import TeamManagement from './pages/TeamManagement';
import Billing from './pages/Billing';
import ServicesManagement from './pages/Services.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'ourservices':
        return <ServicesManagement/>;
      case 'clients':
        return <ClientManagement />;
      case 'tasks':
        return <TaskWorkflow />;
      case 'team':
        return <TeamManagement />;
      case 'billing':
        return <Billing />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 size={28} />
            K3SMM
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'ourservices', label: 'Services', icon: ChartNoAxesGantt },
            { id: 'clients', label: 'Clients', icon: Users },
            { id: 'tasks', label: 'Tasks', icon: CheckSquare },
            { id: 'team', label: 'Team', icon: Users },
            { id: 'billing', label: 'Billing', icon: FileText },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="text-sm text-slate-400">
            <p className="font-semibold">Agency Admin</p>
            <p className="text-xs mt-1">admin@k3smm.local</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
