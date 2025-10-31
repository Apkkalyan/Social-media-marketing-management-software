import { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react';
import { dummyTasks } from '../data/dummy';

export default function TaskWorkflow() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    status: 'To Do',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? { ...formData, id: editingId } : t));
      setEditingId(null);
    } else {
      setTasks([...tasks, { ...formData, id: Date.now() }]);
    }

    setFormData({ title: '', description: '', assignedTo: '', dueDate: '', status: 'To Do' });
    setShowForm(false);
  };

  const handleEdit = (task) => {
    setFormData(task);
    setEditingId(task.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const statuses = ['To Do', 'In Progress', 'Pending Review', 'Completed'];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Task & Workflow</h2>
          <p className="text-gray-600 mt-2">Track and manage all project tasks and deadlines.</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ title: '', description: '', assignedTo: '', dueDate: '', status: 'To Do' });
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Task' : 'Add New Task'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Assign to...</option>
              <option>Amar Poddar</option>
              <option>Sachin Mehta</option>
              <option>Mohit Pandey</option>
              <option>Amit Gupta</option>
            </select>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              rows="3"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {editingId ? 'Update' : 'Add'} Task
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({ title: '', description: '', assignedTo: '', dueDate: '', status: 'To Do' });
              }}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statuses.map(status => (
          <div key={status} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-900 mb-3">{status}</h3>
            <p className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === status).length}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Task</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Assigned To</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Due Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map(task => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{task.assignedTo}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    {task.dueDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.status === 'To Do' ? 'bg-gray-100 text-gray-800' :
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    task.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} />
                    </button>
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
