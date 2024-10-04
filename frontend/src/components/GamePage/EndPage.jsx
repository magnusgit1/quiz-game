
import './EndPage.css';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../UserContext';

const EndPage = () => {
    const { state } = useLocation();
    const { score, category, difficulty } = state || {};
    const navigate = useNavigate();
    const { userName } = useContext(UserContext);

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem('token') === null){
            setMessage('Only registered users can enter the leaderboard.');
            return;
        }
        const postScore = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/leaderboard/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userName, score, category })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const postData = await response.json();
                console.log('Post Data:', postData);

                // Fetch the whole leaderboard instead of category-specific
                const fetchResponse = await fetch('http://localhost:8000/api/leaderboard/');
                if (!fetchResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const leaderboardData = await fetchResponse.json();
                console.log('Leaderboard Data:', leaderboardData);

                // Find the category object
                const categoryData = leaderboardData.find(
                    (item) => item.category === category
                );

                if (!categoryData || !categoryData.scores) {
                    throw new Error('Scores data is missing in the specified category.');
                }

                // Get the scores for the found category
                const scoresForCategory = categoryData.scores;

                // Sort and check if the new score is in the top 3
                const sortedScores = scoresForCategory.sort((a, b) => b.score - a.score);
                if (sortedScores.some((entry, index) => (index < 3 && entry.username === userName && entry.score === score))) {
                    setMessage('Congratulations! Your score made it to the leaderboard.');
                } else {
                    setMessage('Sorry, your score was not high enough to enter the leaderboard.');
                }

            } catch (error) {
                console.error('Failed to post score:', error);
                setMessage('An error occurred while updating the leaderboard.');
            }
        };

        // Check difficulty before posting score
        
        if (userName && score != null && category && (difficulty === "hard" || difficulty === "Hard")) {
            postScore();
        } else if (userName && score != null && category) {
            setMessage('Only scores from hard difficulty quizzes can be posted to the leaderboard.');
        } 
        

    }, [userName, score, category, difficulty]);

    return (
        <div className="main_endpage">
            <h1>Final Score</h1>
            <hr/>
            <p className="endpage_score">{score}</p>
            <p className="message">{message}</p>
            <button className="exit_btn" onClick={() => navigate('/')}>
                Exit
            </button>
        </div>
    );
};

export default EndPage;