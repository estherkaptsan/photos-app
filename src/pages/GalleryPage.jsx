import React from 'react';
import PhotoList from '../cpm/PhotoList';
const GalleryPage = () => {
  return (
    <section className="gallery-page">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <PhotoList />
      </div>
    </section>
  );
};

export default GalleryPage;
