import React, { useEffect, useCallback } from 'react';
import { loadPictures, removePicture, setFilterBy, loadCategories } from '../store/actions/picture.actions';
import CategoryFilter from '../cpm/PhotosFilter';
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage(props) {
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

  const onChangeFilter = (selectedCategory) => {
    dispatch(setFilterBy({ ...filterBy, categories: selectedCategory }));
    dispatch(loadPictures());
  };

  // Get the unique categories from the pictures
  const uniqueCategories = [...new Set(pictures.map((picture) => picture.categories))];
console.log(uniqueCategories)
  // Get the first picture for each category
  const categoryPictures = uniqueCategories.map((categories) => {
    const categoryPictures = pictures.filter((picture) => picture.categories === categories);
    return categoryPictures.length > 0 ? categoryPictures[0] : null;
  });


  console.log(categoryPictures)
  return (
  
      <div className="home-page"> {/* Add the home-page class */}
      <h1>Welcome to my website</h1>
        {/* <CategoryFilter
          categories={categories}
          selectedCategory={filterBy.categories}
          onSelectCategory={onChangeFilter}
        /> */}
        <div className="grid-container"> {/* Add the grid-container class */}
          {categoryPictures.map((picture, index) => (
            <div key={index} className={`grid-item grid-item-${index + 1}`}> {/* Add the grid-item class and index-based grid-item-{index + 1} class */}
              {picture ? (
                <img src={picture.imgUrl} alt={picture.category} />
              ) : (
                <div>No picture available</div>
              )}
              <div className="category-name">{uniqueCategories[index]}</div>
            </div>
          ))}
        </div>
      </div>
    );
}