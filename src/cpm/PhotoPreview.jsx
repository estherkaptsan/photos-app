import React from 'react';

export function PhotoPreview({ picture }) {
  return (
    <>
      
      <div> {picture.title}</div>
      <img src={picture.imgUrl} />
    </>
  );
}
