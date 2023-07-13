import React, { useState } from 'react'
import { uploadService } from '../services/upload.service.js'

const ImgUploader = ({ onFileUpload }) => {
  const [fileUrl, setFileUrl] = useState(null)
  const [fileType, setFileType] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const uploadFile = async (ev) => {
    setIsUploading(true)
    const file = ev.target.files[0]
    const { secure_url, resource_type } = await uploadService.uploadFile(file)
    console.log('secure_url, resource_type', secure_url, resource_type)
    console.log('file type', file.type)
    console.log('file type',fileType)
    setIsUploading(false)
    setFileUrl(secure_url)
    setFileType(resource_type)
    onFileUpload({ url: secure_url, type: resource_type })
  }

  const uploadMsg = () => {
    if (fileUrl) return 'Upload Another?'
    return isUploading ? 'Uploading...' : 'Upload File'
  }

  return (
    <div className="upload-preview">
      {fileUrl && fileType === 'video' && (
        <video
          controls
          src={fileUrl}
          style={{ maxWidth: '200px', float: 'right' }}
        />
      )}
      {fileUrl && fileType === 'image' && (
        <img
          src={fileUrl}
          style={{ maxWidth: '200px', float: 'right' }}
          alt="Uploaded File"
        />
      )}
      <label htmlFor="fileUpload">{uploadMsg()}</label>
      <input
        type="file"
        onChange={uploadFile}
        accept="image/*,video/*"
        id="fileUpload"
      />
    </div>
  )
}

export default ImgUploader
