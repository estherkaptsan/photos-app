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
    'https://res.cloudinary.com/dq9ms8jsq/image/upload/v1723120221/m9jydbe4oor5xbh2zyjv.jpg',
    'https://res.cloudinary.com/dq9ms8jsq/image/upload/v1722961180/deydjakqoszpnkxkp13u.jpg',
    'https://res.cloudinary.com/dq9ms8jsq/image/upload/v1722961074/ap143ytk6ryn09tkodvp.jpg',
    'https://res.cloudinary.com/dq9ms8jsq/image/upload/v1723120520/whov0zx7umrhjqyrqyyf.jpg',
    'https://res.cloudinary.com/dq9ms8jsq/image/upload/v1723120492/edlhjjsnnwwv7znotdvi.jpg',
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
