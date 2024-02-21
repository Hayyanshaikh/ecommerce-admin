import React from 'react';

const Input = ({ className, type, placeholder, value, onChange, icon, label,valid }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`input_field ${className ? className : ""}`}>
      { label ? <label htmlFor={label}>{label}</label> : ''}
      <div className="input_field_wrapper">
        {icon?<label htmlFor={label} className="input_icon">{icon}</label>:''}
      <textarea
        type={type}
        value={value}
        id={label}
        onChange={handleChange}
        placeholder={placeholder}
      />
      </div>
      {valid?<small>{valid}</small>:''}
    </div>
  );
};

export default Input;
