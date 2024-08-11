import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import LazyLoad from 'react-lazyload';

export function PhotoPreview({ picture, onRemovePicture }) {
  const isVideo = picture.mediaUrl.type === 'video';
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);


  if (!picture) return <div className='loader'><CircularProgress /></div>

  return (
    <section className='photo-preview'>
      <Link to={`/photo/${picture._id}`} className='details-link'>
        <LazyLoad height={200} offset={100}>
          {isVideo ? (
            <video controls src={picture.mediaUrl.url} alt={picture.title} />
          ) : (
            <img src={picture.mediaUrl.url} alt={picture.title} />
          )}
        </LazyLoad>
      </Link>
      {loggedInUser && (
        <button
          className="delete-button"
          onClick={() => onRemovePicture(picture._id)}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      )}
    </section>
  );
}
