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

  const onChangeFilter = useCallback(
    (selectedCategory) => {
      dispatch(setFilterBy({ ...filterBy, categories: selectedCategory }));
      dispatch(loadPictures());
    },
    [dispatch, filterBy]
  );

  const uniqueCategories = [...new Set(pictures.map((picture) => picture.categories))];

  // Define categoryPictures here
  const categoryPictures = uniqueCategories.map((category) => {
    const picturesForCategory = pictures.filter((picture) => picture.categories === category);
    return picturesForCategory.length > 0 ? picturesForCategory[0] : null;
  });
  // const isVideo = categoryPictures.mediaUrl.type === 'video';
  console.log('isVideo', categoryPictures);

  // if(!categoryPictures || !pictures) return <div>loading...</div>
  return (
    
    <div className="home-page">
      {/* <h1>Welcome to my website</h1> */}
      <div className="grid-container">
        {uniqueCategories.map((category, index) => (
          <Link
            key={index}
            to={`/gallery/${encodeURIComponent(category)}`}
            onClick={() => onChangeFilter(category)}
          >
            <div className={`grid-item grid-item-${index + 1}`}>
              {categoryPictures[index] ? (
                categoryPictures[index].mediaUrl.type !== 'video' ? (
                  <img src={categoryPictures[index].mediaUrl.url} alt={categoryPictures[index].category} />
                ) : (
                  <video src={categoryPictures[index].mediaUrl.url} alt={categoryPictures[index].category} />
                )
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
