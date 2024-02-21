import * as Icons from "react-icons/tb";
import React,{ useState, useEffect } from 'react';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx'
import CheckBox from '../../components/common/CheckBox.jsx';
import Logo from "../../images/common/logo-dark.svg";
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

const Signup = ({isLogin}) => {
	// check user login or logout
	const [login, setLogin] = useState(false);
	const [loginError, setLoginError] = useState(false);
	const navigate = useNavigate();

  const [formData, setFormData] = useState({
	  email: "",
	  username: "",
	  password: "",
	  Cpassword: "",
	});

  // Function to handle input field changes
  const handleInputChange = (fieldName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
  };

  // check remember
  const [isRemember, setIsRemember] = useState(false);

  // Define a function to handle checkbox state changes
  const handleRememberChange = (check) => {
    setIsRemember(check);
  };

  // show password
  const [show, setShow] = useState(false);

  const handleShowPassword = () =>{
  	setShow(!show);
  }

  // login
  const handleLogin = (e) => {
  	e.preventDefault();
		setLogin(true);
  };

  const hadnleGoogleLogin = () =>{
    setLogin(true);
  }

  useEffect(() => {
    isLogin(login);

    if (login) {
      navigate("/");
    }
  }, [login, isLogin, navigate]);
	return (
		<div className="login">
			<div className="login_sidebar">
				<figure className="login_image">
					<img src="https://images.unsplash.com/photo-1460467820054-c87ab43e9b59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1967&q=80" alt=""/>
				</figure>
			</div>
			<div className="login_form">
				<div className="login_content">
					{/*<h2 className="page_heading">Login</h2>*/}
					<div to="/" className="logo">
	          <img src={Logo} alt="logo" />
	        </div>
					<h2 className="page_heading">Sign up</h2>
				</div>		
				<form className="form" onSubmit={handleLogin}>
					<div className="form_control">
						<Input
	            type="text"
	            value={formData.username}
	            onChange={(value) =>
	              handleInputChange("username", value)
	            }
	            placeholder="Username"
	            icon={<Icons.TbUser/>}
	            label="Username"
	            className={formData.username === "" ? "valid" : ""}
	          />
					</div>
					<div className="form_control">
						<Input
	            type="email"
	            value={formData.email}
	            onChange={(value) =>
	              handleInputChange("email", value)
	            }
	            placeholder="Email or Phone Number"
	            icon={<Icons.TbUser/>}
	            label="Email"
	            className={formData.email === "" ? "valid" : ""}
	          />
					</div>
					<div className="form_control">
						<Input
	            type={show ? "text" : "password"}
	            value={formData.password}
	            onChange={(value) =>
	              handleInputChange("password", value)
	            }
	            placeholder="Password"
	            icon={<Icons.TbEye/>}
	            onClick={handleShowPassword}
	            label="Password"
	            className={formData.password === "" ? "valid" : ""}
	          />
					</div>
					<div className="form_control">
						<Input
	            type={show ? "text" : "password"}
	            value={formData.Cpassword}
	            onChange={(value) =>
	              handleInputChange("Cpassword", value)
	            }
	            placeholder="Confirm Password"
	            icon={<Icons.TbEye/>}
	            onClick={handleShowPassword}
	            label="Confirm Password"
	            className={formData.Cpassword === "" ? "valid" : ""}
	          />
					</div>
					<div className="form_control">
						<CheckBox
			        id="exampleCheckbox"
			        label="Rememeber me"
			        checked={isRemember}
			        onChange={handleRememberChange}
			      />
					</div>
					{loginError ? <small className="incorrect">incorrect email or password and Remember me</small> : ""}
					<div className="form_control">
						<Button
			        label="Login"
			        type="submit"
			      />
					</div>	
				</form>
				<p className="singup_link">
					already have an account <Link to="/login">sign in Metronic</Link>
				</p>
				<button onClick={hadnleGoogleLogin} className="google_signin">
					<figure>
						<img src="https://img.icons8.com/color/1000/google-logo.png" alt=""/>
					</figure>
					<h2>signup with google</h2>
				</button>
			</div>
		</div>
	)
}

export default Signup