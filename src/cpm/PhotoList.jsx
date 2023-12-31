import React from 'react';
import { PhotoPreview } from './PhotoPreview';
import CircularProgress from '@mui/material/CircularProgress'
import LazyLoad from 'react-lazyload';


export default function PhotoList({ pictures, onRemovePicture }) {
  const categories = [...new Set(pictures.map((picture) => picture.category))];

if(!pictures) return <div className='loader'><CircularProgress /></div>
  return (
    <div>
      {categories.map((category) => (
        <section key={category} className="photo-category">
          <div className="photo-list">
            {pictures
              .filter((picture) => picture.category === category)
              .map((picture, index) => (
                <PhotoPreview
                  picture={picture}
                  onRemovePicture={onRemovePicture}
                  key={`${picture._id}-${index}`}
                  className="photo-preview"
                />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
