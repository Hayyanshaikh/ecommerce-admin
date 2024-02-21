import React, { useState, useEffect } from 'react';

const Alert = ({ icon, title, description, className }) => {

  return (
    <div className={`alert ${className}`}>
      {icon ? icon : ''}
      <div className="alert_content">
        <h4>{title}</h4>
        <p className="line_clamp">{description}</p>
      </div>
    </div>
  );
};

export default Alert;
