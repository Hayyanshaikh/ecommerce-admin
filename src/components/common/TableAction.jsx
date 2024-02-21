import React, { useState, useEffect, useRef } from "react";
import * as Icons from "react-icons/tb";

const TableAction = ({ actionItems, onActionItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleAction = () => {
    setIsOpen(!isOpen);
  };

  const handleActionItemClick = (item) => {
    onActionItemClick(item);
    toggleAction();
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="action" ref={dropdownRef}>
      <div className="action_toggle" onClick={toggleAction}>
        <Icons.TbDots />
      </div>
      <ul className={`dropdown_options ${isOpen ? "active" : ""}`}>
        {actionItems.map((item, index) => (
          <li key={index} onClick={() => handleActionItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableAction;