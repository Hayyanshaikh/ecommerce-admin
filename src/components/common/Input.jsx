import React from 'react';

const Input = ({ className, type, placeholder, value, onChange,onClick, icon, max, label,valid, required, name, readOnly }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleInputClick = () => {
    if (onClick) {
      onClick();
    }
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 38 || event.keyCode === 40) {
      event.preventDefault();
    }
  };

  return (
    <div className={`input_field ${className ? className : ""}`}>
      {
        label ? <label htmlFor={label}>{label}</label> : ''
      }
      <div className="input_field_wrapper">
        {
          icon ? <label htmlFor={label} className={`input_icon ${onClick ? "click" : ""}`} onClick={handleInputClick}>{icon}</label> : ''
        }
        <input
          name={name}
          type={type}
          value={value}
          required={required}
          readOnly={readOnly}
          id={label}
          onChange={handleChange}
          placeholder={placeholder}
          min={0}
          max={max}
          onKeyDown={handleKeyDown}
        />
      </div>
      {
        valid ? <small>{valid}</small> : ""
      }
      
    </div>
  );
};

export default Input;
