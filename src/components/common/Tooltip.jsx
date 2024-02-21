import React from 'react'

const Tooltip = ({label,className}) => {
  return (
    <div className={`tooltip ${className}`}>
      {label}
    </div>
  )
}

export default Tooltip