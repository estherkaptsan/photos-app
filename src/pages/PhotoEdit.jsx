import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadPictures, removePicture, setFilterBy, loadCategories } from '../store/actions/picture.actions';
import { pictureService } from '../services/picture.service';
import ImgUploader from '../cpm/ImgUploader';

export default function PhotoEdit(props) {
  const [category, setSelectedOption] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((storeState) => storeState.pictureModule.categories);
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  useEffect(() => {
    dispatch(loadPictures());
  }, []);

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleImageUpload = ({ urls, types }) => {
    // Filter out duplicate mediaUrls from already uploaded photos
    const uniqueUrls = urls.filter((url, index) => {
      const type = types[index];
      return !uploadedPhotos.some((photo) => photo.mediaUrl.url === url && photo.mediaUrl.type === type);
    });
  
    const newPhotos = uniqueUrls.map((url, index) => ({
      category,
      mediaUrl: { url: url, type: types[index] },
    }));
  
    setUploadedPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };
  

  async function handleSubmit(event) {
    event.preventDefault();

    console.log('uploadedPhotos', uploadedPhotos);

    // Save each uploaded photo separately
    for (const photo of uploadedPhotos) {
      await pictureService.savePicture(photo);
    }

    navigate('/');

    setSelectedOption('');
    setUploadedPhotos([]);
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
          value={category}
          onChange={handleSelectChange}
          className="edit-select"
        >
          <option value="">Select a category</option>
          {allCategories.map((category, index) => (
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
