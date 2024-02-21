import React from 'react'

const Button = ({label, className, onClick,type,icon}) => {
  return (
    <>
      <button type={type} className={`button ${className ? className : ""}`} onClick={onClick}>
        {icon ? icon : ""}
        {label ? <span>{label}</span> : null}
      </button>
    </>
  )
}

export default Button