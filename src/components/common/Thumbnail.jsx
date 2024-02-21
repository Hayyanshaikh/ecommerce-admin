import React, { useState } from "react";
import * as Icons from "react-icons/tb";
import Button from './Button.jsx';
import Image from '../../images/common/thumbnail.png';

const Thumbnail = ({ className, required, preloadedImage, onClick }) => {
  const [uploadedImage, setUploadedImage] = useState(preloadedImage || null);

  const handleDelete = () => {
    setUploadedImage(null);
  };

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  return (
    <div className={`thumbnail ${className ? className : ""}`} onClick={handleClick}>
      <figure className="uploaded-image">
        {uploadedImage ? (
          <img src={uploadedImage} alt="Product Thumbnail" />
        ) : (
          <img src={Image} className="defualt_img" alt="Product Thumbnail" />
        )}
        <Icons.TbPencil className="thumbnail_edit" />
        {uploadedImage && (
          <Button onClick={handleDelete} icon={<Icons.TbTrash/>} className="delete_button sm"/>
        )}
      </figure>
      {required ? <small>{required}</small> : ""}
    </div>
  );
};

export default Thumbnail;