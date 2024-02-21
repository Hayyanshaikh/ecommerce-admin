import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotFound = ({ title, message, type }) => {
  return (
    <div className="not_found">
      <h1>{type}</h1>
      <h3>{title}</h3>
      <p>{message}</p>
      <Link to="/" className="button danger">
        <span>Go to Home</span>
      </Link>
    </div>
  );
};

NotFound.defaultProps = {
	type:"404",
	title:"oops.. page not found",
  message: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
};

export default NotFound;