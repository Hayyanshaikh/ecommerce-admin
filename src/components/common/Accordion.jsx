import React, { useState } from 'react';
import * as Icons from "react-icons/tb";

const Accordion = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${isOpen ? 'open' : ''} ${className ? className : ""}`}>
      <div className="accordion_header" onClick={toggleAccordion}>
        <span>{title}</span>
        <Icons.TbChevronDown/>
      </div>
      <div className="accordion_content">{isOpen && children}</div>
    </div>
  );
};

export default Accordion;
