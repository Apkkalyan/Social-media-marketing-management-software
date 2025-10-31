import { useState } from 'react';
import { Plus, Edit2, Trash2, Briefcase, Mail } from 'lucide-react';
import { dummyTeam } from '../data/dummy';

export default function TeamManagement() {
  const [team, setTeam] = useState(dummyTeam);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    startDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTeamMember = () => {
    if (!formData.name.trim()) {
      alert('Please enter a team member name');
      return;
    }

    if (editingId) {
      setTeam(team.map(t => t.id === editingId ? { ...formData, id: editingId } : t));
      setEditingId(null);
    } else {
      setTeam([...team, { ...formData, id: Date.now() }]);
    }

    setFormData({ name: '', email: '', role: '', department: '', startDate: '' });
    setShowForm(false);
  };

  const handleEdit = (member) => {
    setFormData(member);
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTeam(team.filter(t => t.id !== id));
  };

  const roles = [
    'Content Strategist',
    'Video Editor',
    'Graphic Designer',
    'Social Media Manager',
    'Project Manager',
    'Client Success Manager',
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600 mt-2">Manage your agency team and assign roles.</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: '', email: '', role: '', department: '', startDate: '' });
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Team Member' : 'Add New Team Member'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role...</option>
              {roles.map(role => (
                <option key={role}>{role}</option>
              ))}
            </select>
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddTeamMember}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {editingId ? 'Update' : 'Add'} Member
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({ name: '', email: '', role: '', department: '', startDate: '' });
              }}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
          <div key={member.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <div className="flex items-center gap-2 text-sm text-blue-600 mt-1">
                  <Briefcase size={16} />
                  {member.role}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                {member.email}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Department:</span> {member.department}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Start Date:</span> {member.startDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
