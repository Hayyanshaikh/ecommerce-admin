import React, { useState } from 'react';

const Toggler = ({ label, checked, onChange,className, id }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <label className={`toggler ${className ? className : ''}`}>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <small></small>
      <span>{label}</span>
    </label>
  );
};

export default Toggler;
