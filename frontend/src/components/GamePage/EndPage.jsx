
import './EndPage.css';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../UserContext';

// Page for displaying end results, and posting it to the leaderboard if the criterias are met

const EndPage = () => {

    // Get score, category and difficulty from previous location

    const { state } = useLocation();
    const { score, category, difficulty } = state || {};
    const navigate = useNavigate();
    const { userName } = useContext(UserContext);

    const [message, setMessage] = useState('');

    useEffect(() => {

        // Only execute postScore if user is logged in, else return with a message
        if (sessionStorage.getItem('token') === null){
            setMessage('Only registered users can enter the leaderboard.');
            return;
        }

        // Posts to the api with the username and result for the specific category
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

                // New fetch to look up the current leaderboard after the results may have been posted
                const fetchResponse = await fetch('http://localhost:8000/api/leaderboard/');
                if (!fetchResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const leaderboardData = await fetchResponse.json();
                console.log('Leaderboard Data:', leaderboardData);

                // Find the category object for the category that was currently quizzed in
                const categoryData = leaderboardData.find(
                    (item) => item.category === category
                );

                if (!categoryData || !categoryData.scores) {
                    throw new Error('Scores data is missing in the specified category.');
                }

                // Get the scores for the found category
                const scoresForCategory = categoryData.scores;

                // Sort and check if the new score is in the top 3 of the leaderboard
                // set the message to either tell the user its score entered the leaderboard or not
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
        // If username, score and category is present, as well as difficulty being 'hard', call the function.
        // Else, display a message explaining why the result will not enter the leaderboard.
        
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