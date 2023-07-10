import React, { useState } from 'react';
import { uploadService } from '../services/upload.service.js';

const ImgUploader = ({ onImageUpload }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImg = async (ev) => {
    setIsUploading(true);
    const { secure_url, height, width } = await uploadService.uploadImg(ev);
    setIsUploading(false);
    setImgUrl(secure_url);
    setHeight(height);
    setWidth(width);
    onImageUpload(secure_url)
  };

  const uploadMsg = () => {
    if (imgUrl) return 'Upload Another?';
    return isUploading ? 'Uploading....' : 'Upload Image';
  };

  return (
    <div className="upload-preview">
      {imgUrl && (
        <img
          src={imgUrl}
          style={{ maxWidth: '200px', float: 'right' }}
          alt="Uploaded Image"
        />
      )}
      {/* <label htmlFor="imgUpload">{uploadMsg()}</label> */}
      <input
        type="file"
        onChange={uploadImg}
        accept="img/*"
        id="imgUpload"
      />
    </div>
  );
};

export default ImgUploader;
