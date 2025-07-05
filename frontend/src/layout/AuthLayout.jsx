import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Left side - modern hero section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-green via-green-600 to-green-700 items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 p-8 text-center max-w-md">
          <div className="mb-8">
            {/* Logo - matching landing page and sidebar design */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-primary-green rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-4xl font-bold text-white">Organiso</span>
            </div>
            <p className="text-xl text-green-100 leading-relaxed">
              Streamline your workflow with our intuitive Kanban board. 
              Organize tasks, collaborate with your team, and boost productivity.
            </p>
          </div>
          
          {/* Feature highlights */}
          <div className="space-y-4 text-left">
            <div className="flex items-center text-green-100">
              <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
              <span>Drag & drop task management</span>
            </div>
            <div className="flex items-center text-green-100">
              <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
              <span>Real-time team collaboration</span>
            </div>
            <div className="flex items-center text-green-100">
              <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
              <span>Progress tracking & analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form area */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;