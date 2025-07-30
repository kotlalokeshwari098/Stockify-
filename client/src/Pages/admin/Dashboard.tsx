import React from 'react';
import { FiDollarSign, FiUsers, FiPackage, FiActivity } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { IconType } from 'react-icons';

const mockData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
];

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend: number;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="text-white text-xl" />
      </div>
      <span className={`text-xs font-semibold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Revenue"
            value="₹84,254"
            icon={FiDollarSign}
            trend={12}
            color="bg-blue-500"
          />
          <DashboardCard
            title="Total Products"
            value="145"
            icon={FiPackage}
            trend={8}
            color="bg-purple-500"
          />
          <DashboardCard
            title="Active Users"
            value="2,420"
            icon={FiUsers}
            trend={-3}
            color="bg-green-500"
          />
          <DashboardCard
            title="Conversion Rate"
            value="4.5%"
            icon={FiActivity}
            trend={2}
            color="bg-orange-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section - Takes up 2/3 of the space */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Analytics</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommendations Section - Takes up 1/3 of the space */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Smart Inventory Alerts
            </h2>
            <div className="space-y-4">
              {/* Restock Alerts */}
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Items to Restock</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Wheat Flour</li>
                  <li>Maggi</li>
                  <li>Ghee</li>
                  <li>Cooking Oil</li>
                  <li>Dish Soap</li>
                </ul>
              </div>

              {/* Festival Alert */}
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <h3 className="font-medium text-purple-800 mb-2">
                  🪔 Diwali Preparation
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Diyas</li>
                  <li>Ghee</li>
                  <li>Match Boxes</li>
                  <li>Sweets</li>
                </ul>
              </div>

              {/* Critical Alert */}
              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                <h3 className="font-medium text-red-800 mb-2">
                  ⚠️ Critical Low Stock
                </h3>
                <p className="text-sm text-red-700">Sugar inventory critically low!</p>
              </div>

              {/* Warning Alert */}
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                <h3 className="font-medium text-yellow-800 mb-2">
                  ⚡ Running Low
                </h3>
                <p className="text-sm text-yellow-700">Toothbrushes stock about to run out</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Add activity feed items here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;