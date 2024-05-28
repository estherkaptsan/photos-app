import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPictures, removePicture, setFilterBy, loadCategories } from '../store/actions/picture.actions';
import CircularProgress from '@mui/material/CircularProgress';
import WhatsAppLink from '../cpm/WhatsApp';
import EmailAddress from '../cpm/EmailAddress';
import LazyLoad from 'react-lazyload';


export default function HomePage() {
  const pictures = useSelector((storeState) => storeState.pictureModule.pictures);
  const filterBy = useSelector((storeState) => storeState.pictureModule.filterBy);
  const categories = useSelector((storeState) => storeState.pictureModule.categories);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPictures());
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
    'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=1569&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // 'https://res.cloudinary.com/dcwibf9o5/image/upload/v1693221073/dxxrc13sjgein9zvut6p.jpg',
    // 'https://res.cloudinary.com/dcwibf9o5/image/upload/v1693221075/prwazs55uo893vi4qhp2.jpg',
    // 'https://res.cloudinary.com/dcwibf9o5/image/upload/v1693221075/vuy6i5mvnktqrvobscfj.jpg',
    // 'https://res.cloudinary.com/dcwibf9o5/image/upload/v1693221074/uildjoytkhcvfsj8eqro.jpg',
  ];

  useEffect(() => {
    imageUrls.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageUrls]);

  const backgroundImageStyle = {
    backgroundImage: `url(${imageUrls[currentImageIndex]})`,
  };

  if (!categories || !pictures) return <div className='loader'><CircularProgress /></div>;

  return (
    <div className="home-page">
      <div className='hero-container' style={backgroundImageStyle}>
        <section className='header-homepage'>
          Avigail Tamuz
          <div> <a href="/about">About</a></div>
        </section>

        <div className="links-categories">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/gallery/${encodeURIComponent(category)}`}
              onClick={() => onChangeFilter(category)}
            >
              <div className="category-overlay">{category}</div>
            </a>
          ))}
        </div>
        <div className='icons-section'>
          <a href="https://www.instagram.com/gulitamuz_photography/"><i className="fa-brands fa-instagram"></i></a>
          <WhatsAppLink phoneNumber="0528891567" />
          <EmailAddress emailAddress="avigailtamuz@gmail.com" />
        </div>
      </div>
    </div>
  );
}
