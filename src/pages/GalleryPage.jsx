  import React, { useEffect, useCallback } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import PhotoList from '../cpm/PhotoList';
  import { loadPictures, removePicture, setFilterBy , loadCategories} from '../store/actions/picture.actions';
  import CategoryFilter from '../cpm/PhotosFilter';

  export default function GalleryPage(props) {
    const pictures = useSelector((storeState) => storeState.pictureModule.pictures);
    const filterBy = useSelector((storeState) => storeState.pictureModule.filterBy);
    const categories = useSelector((storeState) => storeState.pictureModule.categories);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(loadPictures());
    }, []);

    useEffect(() => {
      dispatch(loadCategories());
    }, []);


    const onRemovePicture = useCallback(async (pictureId) => {
      try {
        dispatch(removePicture(pictureId));
      } catch (error) {
        console.log('error:', error);
      }
    }, []);



    const onChangeFilter = (selectedCategory) => {
      dispatch(setFilterBy({ ...filterBy, categories: selectedCategory }));
      dispatch(loadPictures());
    };

    if (!pictures) return <div>Loading...</div>;

    return (
      <section className="gallery-page">
        <div className="container"> 
          <h2 className="section-title">Gallery</h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={filterBy.categories}
            onSelectCategory={onChangeFilter}
          />
          <PhotoList pictures={pictures} onRemovePicture={onRemovePicture} />
        </div>
      </section>
    );
  }
