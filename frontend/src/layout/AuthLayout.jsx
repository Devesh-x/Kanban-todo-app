import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Left side - placeholder for image/animation */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-primary-green to-green-600 items-center justify-center">
        <div className="p-6 text-center">
          {/* Replace this div with your image/animation component */}
          <div className="w-80 h-80 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-4">Welcome to Organiso</h2>
              <p className="text-xl opacity-90">Organize your tasks, boost your productivity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form area */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;