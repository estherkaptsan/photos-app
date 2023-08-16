import React, { useEffect, useCallback, useState } from 'react';
import { loadPictures, removePicture, setFilterBy, loadCategories } from '../store/actions/picture.actions';
import CategoryFilter from '../cpm/PhotosFilter';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'

export default function HomePage() {
  const pictures = useSelector((storeState) => storeState.pictureModule.pictures);
  const filterBy = useSelector((storeState) => storeState.pictureModule.filterBy);
  const categories = useSelector((storeState) => storeState.pictureModule.categories);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPictures());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const onChangeFilter = useCallback(
    (selectedCategory) => {
      dispatch(setFilterBy({ ...filterBy, category: selectedCategory }));
      dispatch(loadPictures());
    },
    [dispatch, filterBy]
  );

  const imageUrls = [
    'https://res.cloudinary.com/dcwibf9o5/image/upload/v1692108663/vxr0xhlcykjkc3ecfdnu.jpg',
    'https://res.cloudinary.com/dcwibf9o5/image/upload/v1692108532/edjycuq0cni70vlwelbi.jpg',
    'https://res.cloudinary.com/dcwibf9o5/image/upload/v1692180740/slqpbkook3cwbyeqfolu.jpg',,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageUrls]);


  const uniqueCategories = ['Work', 'Personal', 'Projects']
  //  [...new Set(pictures.map((picture) => picture.category))];

  const categoryPictures = ['Work', 'Personal', 'Projects']
  //  uniqueCategories.map((category) => {
  //   const picturesForCategory = pictures.filter((picture) => picture.category === category);
  //   const imagePicture = picturesForCategory.find((picture) => picture.mediaUrl.type !== 'video');
  //   return imagePicture || picturesForCategory.find((picture) => picture.mediaUrl.type === 'video');
  // });

  if (!categoryPictures || !pictures) return <div className='loader'><CircularProgress /></div>;


  return (
    <div className="home-page">
      <div className='hero-container' style={{
        backgroundImage: `url(${imageUrls[currentImageIndex]})`,
        display: 'block'
      }}>
        <section className='header-homepage'>
          Avigail Tamuz
          <div> <Link to="/about">About</Link>
          </div>
        </section>

        <div className="links-categories">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/gallery/${encodeURIComponent(category)}`}
              onClick={() => onChangeFilter(category)}
            >
              <div className="category-overlay">{category}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
