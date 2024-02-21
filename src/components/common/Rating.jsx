import React from 'react'
import * as Icons from "react-icons/tb";

const Rating = ({className,value}) => {
  return (
    <div className={`rating ${className ? className : ""}`}>
      <Icons.TbStarFilled/>
      <span>{value}</span>
    </div>
  )
}

export default Rating