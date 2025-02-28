import React from 'react';

export const Alert = ({ children, className = '' }) => {
  return (
    <div className={`flex gap-3 p-4 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className = '' }) => {
  return (
    <div className={`flex-1 ${className}`}>
      {children}
    </div>
  );
};
