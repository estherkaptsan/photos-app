import React from 'react';


const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="category-filter-container">
      <label className="label" htmlFor="category-select">Filter by Category:</label>
      <div className="category-container">
        {categories.map((category) => (
          <div
            key={category}
            className={`category ${category === selectedCategory ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
