import React from 'react';
import './CategoryItem.css';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ icon, categoryName, categoryId }) => {
    const navigate = useNavigate();
    
    const handleCategoryClick = () => {
        navigate(`/categories/${categoryId}`);
    };

    const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    return (
        <div className='category' onClick={handleCategoryClick}>
            <img src={icon} alt={categoryName} className='category-icon' />
            <div className='category-name'>
              <p>{capitalizedCategoryName}</p>
            </div>
        </div>
    );
};

export default CategoryItem;

