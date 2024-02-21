import React from 'react';

const Badge = ({ label, className }) => {
  return (
    <div className={`badge ${className}`}>
      {label}
    </div>
  );
};

export default Badge;
