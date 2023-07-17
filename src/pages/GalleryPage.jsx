import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotoList from '../cpm/PhotoList';
import { loadPictures, removePicture, setFilterBy, loadCategories } from '../store/actions/picture.actions';
import CategoryFilter from '../cpm/PhotosFilter';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function GalleryPage() {
  const { category } = useParams();
  const pictures = useSelector((storeState) => storeState.pictureModule.pictures);
  const filterBy = useSelector((storeState) => storeState.pictureModule.filterBy);
  const categories = useSelector((storeState) => storeState.pictureModule.categories);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  useEffect(() => {
    dispatch(loadPictures());
    dispatch(loadCategories());

    // Cleanup function
    return () => {
      dispatch(setFilterBy('ALL'));
    };
  }, [dispatch]);

  const queryParams = new URLSearchParams(location.search);
  const filterByCategory = queryParams.get('category');

  const onChangeFilter = useCallback(
    (selectedCategory) => {
      const newParams = queryParams;
      newParams.set('category', selectedCategory);
      navigate(`/gallery/${newParams.toString()}`);
      dispatch(setFilterBy(selectedCategory));
    },
    [dispatch, navigate, queryParams]
  );

  useEffect(() => {
    // Call the filtering function when the URL parameters change
    if (filterByCategory && filterByCategory !== category) {
      onChangeFilter(filterByCategory);
    }
  }, [category, filterByCategory, onChangeFilter]);

  useEffect(() => {
    // Load pictures when the filterBy state changes
    dispatch(loadPictures());
  }, [dispatch, filterBy]);

  const onRemovePicture = useCallback(
    async (pictureId) => {
      try {
        if (!loggedInUser) return;
        dispatch(removePicture(pictureId));
      } catch (error) {
        console.log('error:', error);
      }
    },
    [dispatch, loggedInUser]
  );

  if (!pictures) return <div>Loading...</div>;

  return (
    <section className="gallery-page">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <div className="gallery-wrapper">
          <div className="filter-sidebar">
            <CategoryFilter
              categories={categories}
              selectedCategory={filterBy.categories}
              onSelectCategory={onChangeFilter}
            />
          </div>
          <div className="photo-list-container">
            <PhotoList pictures={pictures} onRemovePicture={onRemovePicture} />
          </div>
        </div>
      </div>
    </section>
  );
}
