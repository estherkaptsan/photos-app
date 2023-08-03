import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadPictures, loadCategories } from '../store/actions/picture.actions';
import { pictureService } from '../services/picture.service';
import ImgUploader from '../cpm/ImgUploader';
import '../Style/PhotoEdit.scss';

export default function PhotoEdit() {
  const [category, setSelectedOption] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((storeState) => storeState.pictureModule.categories);
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  useEffect(() => {
    dispatch(loadPictures());
    dispatch(loadCategories());
  }, [dispatch]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageUpload = ({ urls, types }) => {
    const uniqueUrls = urls.filter((url, index) => {
      const type = types[index];
      setIsUploading(true);

      return !uploadedPhotos.some(
        (photo) => photo.mediaUrl.url === url && photo.mediaUrl.type === type
      );
    });

    const newPhotos = uniqueUrls.map((url, index) => ({
      category,
      mediaUrl: { url: url, type: types[index] },
      created_at: new Date(),
    }));

    setUploadedPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    setIsUploading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsUploading(true);

    for (const photo of uploadedPhotos) {
      await pictureService.savePicture(photo);
    }

    setIsUploading(false);
    navigate('/');
    setSelectedOption('');
    setUploadedPhotos([]);
  };

  const isCategorySelected = category !== '';
  const isFormReadyToSubmit = isCategorySelected && uploadedPhotos.length > 0 && !isUploading;

  return (
    <div className='edit-page'>
      <form className="edit-form" onSubmit={handleSubmit}>
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
        <ImgUploader
          onFileUpload={handleImageUpload}
          isUploading={isUploading}
          isCategorySelected={isCategorySelected}
        />
        <button
          disabled={!isFormReadyToSubmit}
          type="submit"
          className={`edit-button ${isFormReadyToSubmit ? 'enabled' : 'disabled'}`}
        >
          Save
        </button>
      </form>
    </div>
  );
}
