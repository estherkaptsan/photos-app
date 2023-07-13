import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PhotoPreview({ picture, onRemovePicture }) {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  const handleDelete = () => {
    if (!loggedInUser) return
    onRemovePicture(picture._id);
  };

  return (
    <section className="photo-preview">
      <Link to={`/photo/${picture._id}`} className="details-link">
        <h3>{picture.title}</h3>
        <img src={picture.imgUrl} alt={picture.title} />
      </Link>

      {loggedInUser && (
        <button className="delete-button" onClick={handleDelete}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
      )}
    </section>
  );
}
