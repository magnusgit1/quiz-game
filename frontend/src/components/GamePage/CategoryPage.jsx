
// Category Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryPage.css';

const CategoryPage = () => {

    // state for chosen category will be sent forward to the difficulty-page
    const [chosenCategory, setChosenCategory] = useState('');
    const navigate = useNavigate();
    const categories = ['Math', 'Geography', 'General Knowledge', 'Randomized'];

    const handleCategoryClick = (category) => {
        setChosenCategory(category);
        navigate('/difficultypage', { state: { chosenCategory:category } });
    };

    // create the category-buttons through .map
    return (
        <div className="main_categorypage">
            <h1>Select quiz-category</h1>
            <hr></hr>
            <div className="category_buttons">
                {categories.map(cat => (
                    <button className="cat_btn" key={cat} onClick={() => handleCategoryClick(cat)}>{cat}</button>
                ))}
            </div>
        </div>
    )
}
export default CategoryPage;