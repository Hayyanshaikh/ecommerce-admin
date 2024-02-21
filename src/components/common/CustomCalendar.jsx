import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomCalendar = ({ onDateChange,className,label,valid,icon }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateChange(dates);
  };

  return (
    <div className={`input_field calendar ${className?className:""}`}>
      <label htmlFor={label}>{label}</label>
      <label htmlFor={label} className="input_icon">{icon}</label>
      <DatePicker
        className="calendar_input"
        selected={selectedDate}
        minDate={new Date()}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        isClearable
        onChange={handleRangeChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
      />
      <small>{valid}</small>
    </div>
  );
};

export default CustomCalendar;
