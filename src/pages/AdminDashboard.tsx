import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminDashboard: React.FC = () => {
  const { adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Users</span>
                <span className="font-semibold">152</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">New Users (last 7 days)</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Projects</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Support Tickets</span>
                <span className="font-semibold">3</span>
              </div>
            </div>
          </div>

          {/* Recent Activities Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-3">
                <p className="text-sm">New user registration</p>
                <p className="text-xs text-gray-400">Today, 2:30 PM</p>
              </div>
              <div className="border-b border-white/10 pb-3">
                <p className="text-sm">Contact form submission</p>
                <p className="text-xs text-gray-400">Today, 11:15 AM</p>
              </div>
              <div className="border-b border-white/10 pb-3">
                <p className="text-sm">Project 'E-commerce' completed</p>
                <p className="text-xs text-gray-400">Yesterday, 4:45 PM</p>
              </div>
              <div>
                <p className="text-sm">New client onboarded</p>
                <p className="text-xs text-gray-400">Yesterday, 9:30 AM</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3 text-left transition-colors">
                Update Website Content
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3 text-left transition-colors">
                Manage Users
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3 text-left transition-colors">
                View Analytics
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3 text-left transition-colors">
                System Settings
              </button>
            </div>
          </div>
        </div>

        {/* Recent User Table */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap">john@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">Apr 23, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                      Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Alice Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap">alice@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">Apr 22, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                      Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Robert Brown</td>
                  <td className="px-6 py-4 whitespace-nowrap">robert@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">Apr 21, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Emma Wilson</td>
                  <td className="px-6 py-4 whitespace-nowrap">emma@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">Apr 20, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400">
                      Inactive
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
