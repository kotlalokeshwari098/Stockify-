import React from 'react';
import { FaUser, FaChartLine, FaBox, FaShoppingCart, FaCalendarAlt, FaArrowRight, FaPlay, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/adminsignin');
  };

  const handleUserLogin = () => {
    navigate('/usersignin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-300/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200/10 to-blue-300/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <header className="relative backdrop-blur-sm bg-white/70 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaBox className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Stockify
                </h1>
                <p className="text-xs text-gray-500">Smart Inventory Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                {/* <FaPlay className="text-sm" /> */}
                {/* <span className="text-sm font-medium">Watch Demo</span> */}
              </button>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                <FaUser className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
              New: AI-Powered Sales Forecasting
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Stockify: The SaaS Platform<br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Empowering Local Retailers
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empower your local business with intelligent inventory tracking, 
              real-time analytics, and AI-driven insights to maximize profits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <button 
                onClick={handleAdminLogin}
                className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Login as Admin</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </button>
              
              <button 
                onClick={handleUserLogin}
                className="group relative bg-white text-gray-800 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg border border-gray-200 hover:border-green-300"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Login as User</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform text-green-600" />
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-white/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Stockify?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our intelligent platform transforms your business operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaChartLine className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  AI Sales Forecasting
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Predict upcoming trends using advanced AI algorithms to make data-driven business decisions.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaBox className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Real-time Tracking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor stock levels instantly with automated alerts and intelligent reorder suggestions.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Smart Order Management
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Streamline customer orders with our intuitive dashboard and automated workflow system.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaCalendarAlt className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Festival Insights
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Leverage holiday analytics and seasonal patterns to optimize inventory and boost sales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-gray-600 font-medium">Businesses Trust Us</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-gray-600 font-medium">Customer Satisfaction</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-600 font-medium">Expert Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaBox className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold">Stockify</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering businesses with intelligent inventory management
            </p>
            <div className="text-gray-500 text-sm">
              © 2024 Stockify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
