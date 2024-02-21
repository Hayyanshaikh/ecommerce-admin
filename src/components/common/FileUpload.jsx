import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as Icons from "react-icons/tb";
import Button from "./Button.jsx";

const DropZone = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    const filesWithPreview = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
      id: Date.now() + file.name // Assign a unique ID to each file
    }));
    setUploadedFiles(prevFiles => [...prevFiles, ...filesWithPreview]);
  }, []);

  const onDelete = id => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="drop-zone-container">
      <div {...getRootProps()} className="drop-zone">
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select files</p>
      </div>
      {
        uploadedFiles.length > 0 ?
        <div className="uploaded-images">
          {uploadedFiles.map((file, key) => (
            <div key={key} className="uploaded-image-container">
              <figure className="uploaded-image">
                <img src={file.preview} alt={file.name} />
                <Button onClick={() => onDelete(file.id)} icon={<Icons.TbTrash/>} className="sm" />
              </figure>
              <span className="line_clamp">{file.name}</span>
            </div>
          ))}
        </div>
        : ""
      }
    </div>
  );
};

export default DropZone;
