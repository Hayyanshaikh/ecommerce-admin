import React from 'react'

const Divider = ({label, className, children}) => {
	return (
		<div className={`divider ${className ? className : ""}`}>
      {label && <span>{label}</span>}
      {children && children}
    </div>
	)
}

export default Divider;