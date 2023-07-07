import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotoList from '../cpm/PhotoList';
import { loadPictures, removePicture } from '../store/actions/picture.actions';
import CategoryFilter from '../cpm/PhotosFilter'



export default function GalleryPage(props) {
  const pictures = useSelector((storeState) => storeState.pictureModule.pictures);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPictures());
  }, []);

  const onRemovePicture = useCallback(async (pictureId) => {
    try {
      dispatch(removePicture(pictureId))
    } catch (error) {
      console.log('error:', error)
    }
  }, [])

  const categories = ['Nature', 'Travel', 'Food', 'Fashion'];
  const handleCategorySelect = (category) => {
    // Handle the selected category
    console.log('Selected Category:', category);
  };

  if (!pictures) return <div>Loading...</div>;

  return (
    <section className="gallery-page">

      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <CategoryFilter categories={categories} onSelectCategory={handleCategorySelect} />
        <PhotoList pictures={pictures} onRemovePicture={onRemovePicture} />
      </div>
    </section>
  );
}
