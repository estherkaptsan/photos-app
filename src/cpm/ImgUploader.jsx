import React, { useState } from 'react';
import { uploadService } from '../services/upload.service.js';

const ImgUploader = ({ onFileUpload }) => {
  const [fileUrls, setFileUrls] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (ev) => {
    setIsUploading(true);
    const files = ev.target.files;

    // Use Promise.all to upload multiple files concurrently
    const uploadedFiles = await Promise.all(
      Array.from(files).map((file) => uploadService.uploadFile(file))
    );

    // Extract the URLs and types from the uploaded files
    const urls = uploadedFiles.map(({ secure_url }) => secure_url);
    const types = uploadedFiles.map(({ resource_type }) => resource_type);

    setIsUploading(false);
    setFileUrls((prevUrls) => [...prevUrls, ...urls]);
    setFileTypes((prevTypes) => [...prevTypes, ...types]);

    // Pass the array of URLs and types to the onFileUpload callback
    onFileUpload({ urls: [...fileUrls, ...urls], types: [...fileTypes, ...types] });
  };

  const uploadMsg = () => {
    if (fileUrls.length > 0) return 'Upload Another?';
    return isUploading ? 'Uploading...' : 'Upload File';
  };

  return (
    <div className="upload-preview">
      {/* Display uploaded images or videos */}
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
      <label htmlFor="fileUpload">{uploadMsg()}</label>
      <input
        type="file"
        onChange={uploadFile}
        accept="image/*,video/*"
        id="fileUpload"
        multiple // Allow selecting multiple files
      />
    </div>
  );
};

export default ImgUploader;
