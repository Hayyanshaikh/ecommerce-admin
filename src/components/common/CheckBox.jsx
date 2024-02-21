import React from 'react';

const CheckBox = ({ isChecked,label, className, id,onChange}) => {

  const handleCheckboxChange = (e) => {
    const check = e.target.checked;
    onChange(check)
    
  };

  return (
    <label className={`checkbox ${className ? className : ''}`}>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {
        label ? <span>{label}</span> : ""
      }
    </label>
  );
};

export default CheckBox;
