import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const onChangeFilter = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="category-filter-container">
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category ${category === selectedCategory ? 'active' : ''}`}
            onClick={() => onChangeFilter(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

  