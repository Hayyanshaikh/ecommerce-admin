import React from 'react';

const Modal = ({ className, children, bool, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal ${bool ? 'active' : ''} ${className ? className : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
