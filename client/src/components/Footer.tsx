import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Stockify. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <NavLink
                to="/terms"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Terms
              </NavLink>
              <NavLink
                to="/privacy"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Privacy
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;