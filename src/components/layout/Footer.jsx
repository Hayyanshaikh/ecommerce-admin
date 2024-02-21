import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
      <div className="footer">
      	
      	<p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/settings">settings</Link>
          </li>
          <li>
            <Link to="/settings/Security">Security</Link>
          </li>
        </ul>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
