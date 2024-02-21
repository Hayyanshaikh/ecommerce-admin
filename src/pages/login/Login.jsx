import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import Logo from "../../images/common/logo-dark.svg";
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import CheckBox from '../../components/common/CheckBox.jsx';
import {login} from '../../store/slices/authenticationSlice.jsx';

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isRemember, setIsRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleInputChange = (fieldName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
  };

  const handleRememberChange = (check) => {
    setIsRemember(check);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email === "eventadmin@gmail.com" && formData.password === "eventadmin") {
      dispatch(login())
    } else {
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 5000);
    }
  };

  return (
    <div className="login">
      <div className="login_sidebar">
        <figure className="login_image">
          <img src="https://images.unsplash.com/photo-1694537745985-34eacdf76139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="" />
        </figure>
      </div>
      <div className="login_form">
        <div className="login_content">
          <div to="/" className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <h2 className="page_heading">Login</h2>
        </div>
        <form className="form" onSubmit={handleLogin}>
          <div className="form_control">
            <Input
              type="text"
              value={formData.email}
              onChange={(value) =>
                handleInputChange("email", value)
              }
              placeholder="Email or Phone Number"
              icon={<Icons.TbMail/>}
              label="Email or Number"
            />
          </div>
          <div className="form_control">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(value) =>
                handleInputChange("password", value)
              }
              placeholder="Password"
              label="Password"
              onClick={handleShowPassword}
              icon={<Icons.TbEye/>}
            />
          </div>
          <div className="form_control">
            <CheckBox
              id="rememberCheckbox"
              label="Remember me"
              checked={isRemember}
              onChange={handleRememberChange}
            />
          </div>
          {loginError && <small className="incorrect">Incorrect email or password and Remember me</small>}
          <div className="form_control">
            <Button
              label="Login"
              type="submit"
            />
          </div>
        </form>
        <p className="signup_link">
          Don't have an account yet? <Link to="/signup">Join Metronic</Link>
        </p>
        <button className="google_signin">
          <figure>
            <img src="https://img.icons8.com/color/1000/google-logo.png" alt="" />
          </figure>
          <h2>Sign in with Google</h2>
        </button>
      </div>
    </div>
  );
}

export default Login;