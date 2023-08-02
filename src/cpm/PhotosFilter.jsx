import React, { useState } from 'react';


const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState({category : selectedCategory});

  const onChangeFilter = (category) => {
    setActiveCategory({category : category})
    onSelectCategory({category : category});
    console.log(category);
  };

  return (
    <div className="category-filter-container">
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category ${category === activeCategory  ? 'active' : ''}`}
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
