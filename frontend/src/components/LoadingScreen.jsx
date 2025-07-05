// src/components/LoadingScreen.jsx
import React from 'react';

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] text-white">
      <span className="loading loading-bars loading-lg text-primary mb-4"></span>
      <p className="text-lg font-semibold animate-pulse text-gray-300">{message}</p>
    </div>
  );
};

export default LoadingScreen;
