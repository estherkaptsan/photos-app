import React, { useEffect, useCallback } from 'react';
import { loadPictures, removePicture, setFilterBy, loadCategories } from '../store/actions/picture.actions';
import CategoryFilter from '../cpm/PhotosFilter';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const pictures = useSelector((storeState) => storeState.pictureModule.pictures);
  const filterBy = useSelector((storeState) => storeState.pictureModule.filterBy);
  const categories = useSelector((storeState) => storeState.pictureModule.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPictures());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const onChangeFilter = (selectedCategory) => {
    dispatch(setFilterBy({ ...filterBy, categories: selectedCategory }));
    dispatch(loadPictures());
  };

  const uniqueCategories = [...new Set(pictures.map((picture) => picture.categories))];

  // Define categoryPictures here
  const categoryPictures = uniqueCategories.map((category) => {
    const picturesForCategory = pictures.filter((picture) => picture.categories === category);
    return picturesForCategory.length > 0 ? picturesForCategory[0] : null;
  });

  return (
    <div className="home-page">
      <h1>Welcome to my website</h1>
      <div className="grid-container">
        {uniqueCategories.map((category, index) => (
          <Link key={index} to={`/gallery?category=${encodeURIComponent(category)}`}>
            <div className={`grid-item grid-item-${index + 1}`}>
              {categoryPictures[index] ? (
                <img src={categoryPictures[index].imgUrl} alt={categoryPictures[index].category} />
              ) : (
                <div>No picture available</div>
              )}
              <div className="category-name">{category}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
