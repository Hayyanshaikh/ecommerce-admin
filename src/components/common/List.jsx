import React from 'react';

const List = ({ items,className }) => {
  return (
    <ul className={`list ${className ? className : ""}`}>
      {items.map((item, index) => (
        <li key={index} className="list-item">{item}</li>
      ))}
    </ul>
  );
};

export default List;
