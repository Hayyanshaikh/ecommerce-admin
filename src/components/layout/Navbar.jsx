import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/tb";
import Input from '../common/Input.jsx';
import Profile from '../common/Profile.jsx';
import ProfileImg from '../../images/users/user_3.webp';

const Navbar = () => {
  const [user] = useState({
    username: "Your Username",
    email: "your@email.com", // Replace with your user data
  });

  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        <div className="container">
          <div className="navbar_main">
            <Input
              icon={<Icons.TbSearch />}
              placeholder="Search..."
              className="navbar_search"
            />
            <div className="navbar_icons">
              <Link className="navbar_icon">
                <Icons.TbLayoutGrid />
              </Link>
              <Link className="navbar_icon">
                <Icons.TbChartLine />
              </Link>
              <Link className="navbar_icon">
                <Icons.TbMessage2 />
              </Link>
              <Link className="navbar_icon">
                <Icons.TbSunHigh />
              </Link>
              <Profile
                name={user.username}
                slogan={user.email}
                className="admin_profile"
                src={ProfileImg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;