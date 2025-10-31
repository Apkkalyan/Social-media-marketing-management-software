import React, { useState } from 'react';
import { Trash2, PlusCircle } from 'lucide-react'; // Assuming you use lucide-react icons

// Initial set of services (Replace with API fetch in a real app)

export const initialServices = [
  // -----------------------------------------------------
  // 1. Social Media Management & Content Creation
  // -----------------------------------------------------
  { id: 101, name: 'Monthly Social Media Management (Standard)', price: 15000.00 },
  { id: 102, name: 'Custom Instagram Reel/TikTok Video (x5)', price: 7500.00 },
  { id: 103, name: 'Social Media Strategy & Audit (One-time)', price: 5000.00 },
  { id: 104, name: 'Community Engagement & Monitoring (Weekly)', price: 4000.00 },
  { id: 105, name: 'Monthly Content Calendar Creation', price: 6000.00 },

  // -----------------------------------------------------
  // 2. Search Engine Optimization (SEO) & Web
  // -----------------------------------------------------
  { id: 201, name: 'Comprehensive Technical SEO Audit', price: 9500.00 },
  { id: 202, name: 'Monthly SEO Keyword Research & Planning', price: 4500.00 },
  { id: 203, name: 'On-Page SEO Optimization (per 5 pages)', price: 5500.00 },
  { id: 204, name: 'Google My Business (GMB) Optimization', price: 3000.00 },
  { id: 205, name: 'Monthly Backlink Analysis & Outreach', price: 8000.00 },

  // -----------------------------------------------------
  // 3. Paid Advertising (PPC)
  // -----------------------------------------------------
  { id: 301, name: 'Google Ads Campaign Setup & Launch', price: 12000.00 },
  { id: 302, name: 'Monthly Google Ads Management Fee', price: 10000.00 },
  { id: 303, name: 'Facebook/Instagram Ads Campaign Setup', price: 8500.00 },
  { id: 304, name: 'Monthly Facebook Ads Management Fee', price: 7500.00 },
  { id: 305, name: 'Retargeting Campaign Strategy & Implementation', price: 6500.00 },

  // -----------------------------------------------------
  // 4. Content Writing & Copywriting
  // -----------------------------------------------------
  { id: 401, name: 'Premium Blog Post Writing (1500 words)', price: 4000.00 },
  { id: 402, name: 'Website Landing Page Copy (x1)', price: 7000.00 },
  { id: 403, name: 'Email Newsletter Copy (x4 per month)', price: 5000.00 },
  { id: 404, name: 'Product Description Writing (x10 items)', price: 3500.00 },
  { id: 405, name: 'Basic Press Release Writing', price: 4500.00 },

  // -----------------------------------------------------
  // 5. Graphic Design & Branding
  // -----------------------------------------------------
  { id: 501, name: 'Custom Logo Design (3 Concepts)', price: 15000.00 },
  { id: 502, name: 'Social Media Graphics Pack (20 assets)', price: 6500.00 },
  { id: 503, name: 'Branding Guidelines Document', price: 11000.00 },
  { id: 504, name: 'Infographic Design (Complex)', price: 8000.00 },
  { id: 505, name: 'Business Card and Letterhead Design', price: 3500.00 },
  
  // -----------------------------------------------------
  // 6. Consulting & Analytics
  // -----------------------------------------------------
  { id: 601, name: 'Digital Strategy Consulting (Hourly)', price: 3000.00 },
  { id: 602, name: 'Google Analytics 4 Setup & Configuration', price: 7500.00 },
  { id: 603, name: 'Monthly Performance Reporting & Analysis', price: 4500.00 },
  { id: 604, name: 'User Experience (UX) Audit', price: 9000.00 },
  { id: 605, name: 'Custom CRM Integration Support (Per Hour)', price: 2800.00 },
];


export default function ServicesManagement() {
  const [services, setServices] = useState(initialServices);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  // Function to handle adding a new service
  const handleAddService = () => {
    if (newServiceName.trim() === '' || isNaN(parseFloat(newServicePrice))) {
      alert("Please enter a valid name and price.");
      return;
    }

    const newService = {
      id: Date.now(), // Simple unique ID generation
      name: newServiceName.trim(),
      price: parseFloat(newServicePrice).toFixed(2),
    };

    setServices([...services, newService]);
    setNewServiceName('');
    setNewServicePrice('');
  };

  // Function to handle deleting a service
  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="p-8">
      {/* 📋 Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Service Catalog Management</h1>
      <p className="text-gray-500 mb-8">Add, remove, and manage the services that appear in client invoices.</p>

      {/* ➕ Add New Service Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Service Name (e.g., SEO Audit)"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newServicePrice}
            onChange={(e) => setNewServicePrice(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleAddService}
            className="flex items-center justify-center bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition duration-150"
          >
            <PlusCircle size={20} className="mr-2" /> Add Service
          </button>
        </div>
      </div>

      {/* 📜 Service List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Existing Services ({services.length})</h2>
        
        {/* Table/List Header */}
        <div className="grid grid-cols-4 gap-4 p-3 font-medium text-gray-500 border-b border-gray-200">
          <div className="col-span-2">Service Name</div>
          <div>Price</div>
          <div>Actions</div>
        </div>

        {/* List of Services */}
        {services.map((service) => (
          <div key={service.id} className="grid grid-cols-4 gap-4 items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition duration-100">
            <div className="col-span-2 font-medium text-gray-800">{service.name}</div>
            <div className="text-gray-600">₹{service.price}</div>
            <div>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150"
                title="Delete Service"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}