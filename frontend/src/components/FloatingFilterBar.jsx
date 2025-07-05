// src/components/FloatingFilterBar.jsx
import React from 'react';

const FloatingFilterBar = ({ children }) => {
  return (
    <div
      className="bg-primary-green text-white rounded-lg p-4 mb-8 flex flex-wrap gap-4 items-center shadow border border-primary-green sticky top-4 z-20"
    >
      {children}
    </div>
  );
};

export default FloatingFilterBar;
