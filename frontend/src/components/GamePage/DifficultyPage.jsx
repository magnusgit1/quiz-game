
// Difficulty-page

import { useNavigate, useLocation } from 'react-router-dom';
import './DifficultyPage.css';

const DifficultyPage = () => {

    const { state } = useLocation();
    const { chosenCategory } = state;
    const navigate = useNavigate();
    const difficulties = ['easy', 'medium', 'hard'];

    const handleDifficultyClick = (difficulty) =>{
        navigate('/gamepage', { state: {category:chosenCategory, difficulty} });
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
            <p>Only results from hard-difficulty can be registered to the leaderboard</p>
        </div>
    )
}
export default DifficultyPage;