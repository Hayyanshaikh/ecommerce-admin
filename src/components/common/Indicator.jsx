import React from 'react';

const Indicator = ({ className, active }) => {
  return (
    <div className={`indicator ${className} ${active ? 'active' : ''}`}>
      <span style={{ animationDelay: '0.5s' }}></span>
      <span style={{ animationDelay: '0.7s' }}></span>
      <span style={{ animationDelay: '0.9s' }}></span>
    </div>
  );
};

export default Indicator;
