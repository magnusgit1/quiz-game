
// Difficulty-page

import { useNavigate, useLocation } from 'react-router-dom';
import './DifficultyPage.css';

const DifficultyPage = () => {

    const { state } = useLocation();
    const { category } = state;
    const navigate = useNavigate();
    const difficulties = ['Easy', 'Medium', 'Hard'];

    const handleDifficultyClick = (difficulty) =>{
        navigate('/gamepage', { state: {category, difficulty} });
    };

    return (
        <div className="main_difficultypage">
            <h1>Select difficulty</h1>
            <hr></hr>
            <div className="diff_btns">
                {difficulties.map(diff =>(
                    <button className='diff_btn' key={diff} onClick={() => handleDifficultyClick(diff)}>{diff}</button>
                ))}
            </div>
        </div>
    )
}
export default DifficultyPage;