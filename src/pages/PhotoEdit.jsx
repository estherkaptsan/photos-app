import React, { useState } from 'react';
import ImgUploader from '../cpm/ImgUploader';

export default function PhotoEdit() {
  const [selectedOption, setSelectedOption] = useState('');
  const [title, setTitle] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageUpload = (imageUrl) => {
    console.log(imageUrl)
    setUploadedImageUrl(imageUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any necessary logic with the submitted data
    console.log('Title:', title);
    console.log('Category:', selectedOption);
    console.log('Uploaded Image URL:', uploadedImageUrl);

    // Reset the form
    setTitle('');
    setSelectedOption('');
    setUploadedImageUrl('');
  };

  return (
    <div>
      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          className="edit-input"
          value={title}
          onChange={handleTitleChange}
        />
        <select
          name="category"
          value={selectedOption}
          onChange={handleSelectChange}
          className="edit-select"
        >
          <option value="">Select a category</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
          <option value="children">Children</option>
          <option value="wedding">Wedding</option>
        </select>
        <ImgUploader onImageUpload={handleImageUpload} />
        <button type="submit" className="edit-button">
          Save
        </button>
      </form>
    </div>
  );
}
