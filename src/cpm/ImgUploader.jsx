// import React, { useState } from 'react'
// import { uploadService } from '../services/upload.service.js'

// const ImgUploader = ({ onImageUpload }) => {
//   const [imgUrl, setImgUrl] = useState(null)
//   const [height, setHeight] = useState(500)
//   const [width, setWidth] = useState(500)
//   const [isUploading, setIsUploading] = useState(false)

//   const uploadImg = async (ev) => {
//     setIsUploading(true)
//     const { secure_url, height, width } = await uploadService.uploadImg(ev)
//     setIsUploading(false)
//     setImgUrl(secure_url)
//     setHeight(height)
//     setWidth(width)
//     onImageUpload(secure_url)
//   }

//   const uploadMsg = () => {
//     if (imgUrl) return 'Upload Another?'
//     return isUploading ? 'Uploading....' : 'Upload Image'
//   }

//   return (
//     <div className="upload-preview">
//       {imgUrl && (
//         <img
//           src={imgUrl}
//           style={{ maxWidth: '200px', float: 'right' }}
//           alt="Uploaded Image"
//         />
//       )}
//       {/* <label htmlFor="imgUpload">{uploadMsg()}</label> */}
//       <input
//         type="file"
//         onChange={uploadImg}
//         accept="img/*"
//         id="imgUpload"
//       />
//     </div>
//   )
// }

// export default ImgUploader
import React, { useState } from 'react'
import { uploadService } from '../services/upload.service.js'

const ImgUploader = ({ onFileUpload }) => {
  const [fileUrl, setFileUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const uploadFile = async (ev) => {
    setIsUploading(true)
    const file = ev.target.files[0]
    const fileUrl = await uploadService.uploadFile(file)
    console.log('file', file)
    console.log('file type', file.type)
    setIsUploading(false)
    setFileUrl(fileUrl)
    onFileUpload(fileUrl)
  }

  const uploadMsg = () => {
    if (fileUrl) return 'Upload Another?'
    return isUploading ? 'Uploading...' : 'Upload File'
  }

  return (
    <div className="upload-preview">
      {fileUrl && (
        <video
          controls
          src={fileUrl}
          style={{ maxWidth: '200px', float: 'right' }}
        />
      )}
      <label htmlFor="fileUpload">{uploadMsg()}</label>
      <input
        type="file"
        onChange={uploadFile}
        accept="video/*"
        id="fileUpload"
      />
    </div>
  )
}

export default ImgUploader
