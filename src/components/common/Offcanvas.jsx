import React from 'react';

const Offcanvas = ({ className, children, isOpen, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`offcanvas ${isOpen ? 'active' : ''} ${className ? className : ''}`} onClick={handleOverlayClick}>
      <div className="offcanvas-content">
        {children}
      </div>
    </div>
  );
};
export default Offcanvas;
