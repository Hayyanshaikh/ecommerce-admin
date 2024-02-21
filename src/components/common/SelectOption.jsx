import React from 'react';
import Select from 'react-select';

const SelectOption = ({ icon, options, label, valid, className, placeholder, multiSelect = false, value, onChange }) => {

  const handleSelectChange = (selectedOption) => {
    if (onChange) {
      onChange(selectedOption); // Pass the selected option to the parent component
    }
  };

  return (
    <div className={`select_option input_field ${className}`}>
      {label ? <label htmlFor={label}>{label}</label> : ''}
      <div className="input_field_wrapper">
        {icon ? <label htmlFor={label} className="input_icon">{icon}</label> : ''}
        <Select
          isMulti={multiSelect}
          options={options}
          placeholder={placeholder}
          value={value}
          onChange={handleSelectChange}
        />
      </div>
      {valid ? <small>{valid}</small> : ''}
    </div>
  )
}

export default SelectOption;
