import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

export function PhotoPreview({ picture, onRemovePicture }) {
  const isVideo = picture.mediaUrl.type === 'video';
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);


  // console.log('picture from the preview', picture)
  return (
    <>
      <section className='photo-preview'>
        <Link to={`/photo/${picture._id}`} className='details-link'>
          {/* <h3>{picture.title}</h3> */}
          {isVideo ? (
            <video controls src={picture.mediaUrl.url} alt={picture.title} />
          ) : (
            <img src={picture.mediaUrl.url} alt={picture.title} />
          )}
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
    </>
  );
}
