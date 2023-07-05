import React from 'react';

export function PhotoPreview({ picture, onRemovePicture }) {
  return (
    <>
      <section className='photo-preview'>
        <h3>{picture.title}</h3>
        <img src={picture.imgUrl} />
        <button onClick={() => onRemovePicture(picture._id)}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </section>
    </>
  );
}
