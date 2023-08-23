import React, { useState } from 'react';
import { uploadService } from '../services/upload.service.js';

const ImgUploader = ({ onFileUpload, isUploading, isCategorySelected }) => {
  const [fileUrls, setFileUrls] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);

  const uploadFile = async (ev) => {
    if (!isCategorySelected) {
      alert("Please choose a category first.");
      return;
    }

    const files = ev.target.files;

    const uploadedFiles = await Promise.all(
      Array.from(files).map((file) => uploadService.uploadFile(file))
    );

    const urls = uploadedFiles.map(({ secure_url }) => secure_url);
    const types = uploadedFiles.map(({ resource_type }) => resource_type);

    setFileUrls((prevUrls) => [...prevUrls, ...urls]);
    setFileTypes((prevTypes) => [...prevTypes, ...types]);

    onFileUpload({ urls: [...fileUrls, ...urls], types: [...fileTypes, ...types] });
  };

  const uploadMsg = () => {
    if (fileUrls.length > 0) return 'Upload Another?';
    return isUploading ? 'Uploading...' : 'Upload File';
  };

  return (
    <div className="upload-preview">
      {fileUrls.map((url, index) => {
        if (fileTypes[index] === 'video') {
          return (
            <video
              key={index}
              controls
              src={url}
              style={{ maxWidth: '200px', float: 'right' }}
            />
          );
        } else if (fileTypes[index] === 'image') {
          return (
            <img
              key={index}
              src={url}
              style={{ maxWidth: '200px', float: 'right' }}
              alt="Uploaded File"
            />
          );
        }
        return null;
      })}
      <label htmlFor="fileUpload"  className={isCategorySelected && !isUploading ? 'enabled' : 'disabled'}>{uploadMsg()}</label>
      <input
        disabled={!isCategorySelected || isUploading}
        type="file"
        onChange={uploadFile}
        accept="image/*,video/*"
        id="fileUpload"
        multiple  
      />
    </div>
  );
};

export default ImgUploader;
