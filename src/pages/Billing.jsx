import { useState } from 'react';
import { Plus, Printer, Check, Clock } from 'lucide-react';
import { dummyClients, dummyInvoices } from '../data/dummy';
import {initialServices} from './Services'

export default function Billing() {
  const [invoices, setInvoices] = useState(dummyInvoices);
  const [showForm, setShowForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    amount: '',
    dueDate: '',
    status: 'Pending',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddInvoice = () => {
    if (!formData.clientName.trim() || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    setInvoices([...invoices, {
      ...formData,
      id: invoices.length + 1,
      amount: parseFloat(formData.amount),
      createdDate: new Date().toISOString().split('T')[0],
    }]);

    setFormData({ clientName: '', service: '', amount: '', dueDate: '', status: 'Pending' });
    setShowForm(false);
  };

  const handleMarkPaid = (id) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: 'Paid' } : inv));
  };

  const handlePrint = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const paidInvoices = invoices.filter(inv => inv.status === 'Paid').length;
  const pendingInvoices = invoices.filter(inv => inv.status === 'Pending').length;
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Billing & Invoicing</h2>
          <p className="text-gray-600 mt-2">Manage invoices and track client payments.</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormData({ clientName: '', service: '', amount: '', dueDate: '', status: 'Pending' });
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Paid Invoices</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{paidInvoices}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Pending Invoices</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{pendingInvoices}</p>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Invoice</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Client...</option>
              {dummyClients.map(client => (
                <option key={client.id}>{client.name}</option>
              ))}
            </select>
            <select
              type="text"
              name="service"
              placeholder="Service Description"
              value={formData.service}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Services...</option>
              {initialServices.map(service => (
                <option key={service.id}>{service.name}</option>
              ))}
            </select>
            <input
              type="number"
              name="amount"
              placeholder="Amount (₹)"
              value={formData.amount}
              onChange={handleInputChange}
              step="0.01"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddInvoice}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Invoice
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setFormData({ clientName: '', service: '', amount: '', dueDate: '', status: 'Pending' });
              }}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Invoice #{selectedInvoice.id}</h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-600 text-2xl hover:text-gray-800"
              >
                ×
              </button>
            </div>

            <div className="border-b pb-6 mb-6">
              <p className="text-gray-900 font-semibold">{selectedInvoice.clientName}</p>
              <p className="text-sm text-gray-600">Invoice Date: {selectedInvoice.createdDate}</p>
              <p className="text-sm text-gray-600">Due Date: {selectedInvoice.dueDate}</p>
            </div>

            <div className="mb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-900">Description</th>
                    <th className="text-right py-2 text-gray-900">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 text-gray-600">{selectedInvoice.service}</td>
                    <td className="text-right text-gray-900">₹{selectedInvoice.amount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mb-6">
              <div className="text-right">
                <p className="text-gray-600 text-sm">Total Amount Due</p>
                <p className="text-3xl font-bold text-gray-900">₹{selectedInvoice.amount.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t pt-6 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex-1"
              >
                <Printer size={18} />
                Print / Save as PDF
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Invoice #</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Client</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Due Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map(invoice => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 font-medium">#{invoice.id}</td>
                <td className="px-6 py-4 text-gray-600">{invoice.clientName}</td>
                <td className="px-6 py-4 text-gray-600">{invoice.service}</td>
                <td className="px-6 py-4 text-gray-900 font-semibold">₹{invoice.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-600">{invoice.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ₹{
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {invoice.status === 'Paid' ? <Check size={14} /> : <Clock size={14} />}
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePrint(invoice)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Printer size={18} />
                    </button>
                    {invoice.status === 'Pending' && (
                      <button
                        onClick={() => handleMarkPaid(invoice.id)}
                        className="text-green-600 hover:text-green-800 transition"
                      >
                        <Check size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
