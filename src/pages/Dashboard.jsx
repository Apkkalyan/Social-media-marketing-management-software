import { TrendingUp, AlertCircle, IndianRupee, Users } from 'lucide-react';
import { dummyClients, dummyTasks, dummyInvoices } from '../data/dummy';

export default function Dashboard() {
  const activeClients = dummyClients.filter(c => c.status === 'Active').length;
  const pendingTasks = dummyTasks.filter(t => t.status !== 'Completed').length;
  const pendingInvoices = dummyInvoices.filter(inv => inv.status === 'Pending');
  const nextBillingDue = pendingInvoices.length > 0
    ? pendingInvoices.reduce((min, inv) => inv.amount < min.amount ? inv : min).amount
    : 0;

  const metrics = [
    {
      label: 'Active Clients',
      value: activeClients,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Pending Tasks',
      value: pendingTasks,
      icon: AlertCircle,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      label: 'Next Billing Due',
      value: `₹${nextBillingDue.toFixed(2)}`,
      icon: IndianRupee,
      color: 'bg-green-50 text-green-600',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome back! Here's your agency overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                </div>
                <div className={`₹{metric.color} p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
          <div className="space-y-4">
            {dummyTasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center justify-between pb-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.assignedTo}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ₹{
                  task.status === 'To Do' ? 'bg-gray-100 text-gray-800' :
                  task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Invoices</h3>
          <div className="space-y-4">
            {pendingInvoices.slice(0, 5).map(invoice => (
              <div key={invoice.id} className="flex items-center justify-between pb-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">Invoice #{invoice.id}</p>
                  <p className="text-sm text-gray-600">{invoice.clientName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{invoice.amount.toFixed(2)}</p>
                  <p className="text-xs text-orange-600 font-medium">Pending</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
