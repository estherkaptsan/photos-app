import React from 'react';

export function PhotoPreview({ picture }) {
  return (
    <>
      <section className='photo-preview'>

      <h3> {picture.title}</h3>
      <img src={picture.imgUrl} />
      </section>
    </>
  );
}
