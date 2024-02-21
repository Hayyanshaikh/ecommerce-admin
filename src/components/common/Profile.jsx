import React from 'react'
import { Link } from "react-router-dom";

const Profile = ({src,name,className,slogan,link}) => {
	return (
		<Link to={link} className={`product_profile ${className ? className : ''}`}>
			<figure>
				<img src={src} alt={src}/>
			</figure>
			<div className="product_profile_content">
				<span>{name}</span>
				{slogan ? <p>{slogan}</p> : ""}
			</div>
		</Link>
	)
}

export default Profile;