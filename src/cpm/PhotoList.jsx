import React from 'react';
import { PhotoPreview } from './PhotoPreview';

export default function PhotoList({ pictures }) {
  // Get unique categories from pictures
  const categories = [...new Set(pictures.map((picture) => picture.categories))];

  return (
    <div>
      {categories.map((category) => (
        <section key={category} className="photo-category">
          <h3 className="category-title">{category}</h3>
          <div className="photo-list">
            {pictures
              .filter((picture) => picture.categories === category)
              .map((picture) => (
                <PhotoPreview picture={picture} key={picture._id} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
