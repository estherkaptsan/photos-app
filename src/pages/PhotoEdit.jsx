import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadPictures, removePicture, setFilterBy, loadCategories } from '../store/actions/picture.actions'
import { pictureService } from '../services/picture.service'
import ImgUploader from '../cpm/ImgUploader'


export default function PhotoEdit(props) {
  const [categories, setSelectedOption] = useState('')
  const [title, setTitle] = useState('')
  const [mediaUrl, setUploadedImageUrl] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const allCategoties = useSelector((storeState) => storeState.pictureModule.categories)
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

  useEffect(() => {
    dispatch(loadPictures())
  }, [])

  useEffect(() => {
    dispatch(loadCategories())
  }, [])

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleImageUpload = (mediaUrl) => {
    console.log(mediaUrl)
    setUploadedImageUrl(mediaUrl)
  }
  
  async function handleSubmit(event) {
    event.preventDefault()
    console.log('mediaUrl', mediaUrl)
    const newPhoto = {
      title,
      categories,
      mediaUrl
    }

    console.log('allCategoties', allCategoties)
    await pictureService.savePicture(newPhoto)
    navigate('/')

    setTitle('')
    setSelectedOption('')
    setUploadedImageUrl([])
  }


  // if (!loggedInUser) return (<div>no loggedInUser</div>)
  return (
    <div className='edit-page'>
      <form className="edit-form" onSubmit={handleSubmit}>
        {/* <input
          placeholder="Title"
          className="edit-input"
          value={title}
          onChange={handleTitleChange}
        /> */}
        <select
          name="category"
          value={categories}
          onChange={handleSelectChange}
          className="edit-select"
        >
          <option value="">Select a category</option>
          {allCategoties.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <ImgUploader onFileUpload={handleImageUpload} />
        <button type="submit" className="edit-button">
          Save
        </button>
      </form>
    </div>
  )
}
