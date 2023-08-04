import React from 'react';
import { PhotoPreview } from './PhotoPreview';
import CircularProgress from '@mui/material/CircularProgress'

export default function PhotoList({ pictures, onRemovePicture }) {
  // Get unique categories from pictures
  const categories = [...new Set(pictures.map((picture) => picture.category))];
// console.log('pictures from photo list',{pictures})

if(!pictures) return <div className='loader'><CircularProgress /></div>
  return (
    <div>
      {categories.map((category) => (
        <section key={category} className="photo-category">
          {/* <h3 className="category-title">{category}</h3> */}
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
