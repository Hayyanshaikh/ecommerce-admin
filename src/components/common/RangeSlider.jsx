import React from 'react';
import Slider from 'react-slider';

function RangeSlider({ values, onValuesChange,label }) {
  const handleInputChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = parseInt(event.target.value, 10);
    onValuesChange(newValues);
  };

  return (
    <div className="slider_main input_field ">
      {
        label ? <label htmlFor={label}>{label}</label> : ''
      }
      <Slider
        min={0}
        max={100}
        value={values}
        onChange={onValuesChange}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        pearling
        minDistance={6}
      />
      <div className="slider_inputs">
        <label>$</label>
        <input
          type="number"
          value={values[0]}
          onChange={e => handleInputChange(0, e)}
          className="slider_input"
        />
        <label>to</label>
        <label>$</label>
        <input
          type="number"
          value={values[1]}
          onChange={e => handleInputChange(1, e)}
          className="slider_input"
        />
      </div>  
    </div>
  );
}

export default RangeSlider;
