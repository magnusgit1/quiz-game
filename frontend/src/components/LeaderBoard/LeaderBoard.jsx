
import { useEffect, useState } from 'react';
import './LeaderBoard.css';

// Component to display the leaderboard, includes the 3 different categories, with the top 3 scores.

const LeaderBoard = () => {
    const [leaderBoard, setLeaderBoard] = useState([]);

    // Fetches the data from the api, where the top 3 scores for each category (on hard-mode) are collected and stored in the database
    useEffect(() => {
        const fetchLeaderBoard = async () => {
            try {
                const response = await fetch('https://quizbackend-2egv.onrender.com/api/leaderboard/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLeaderBoard(data);
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
            }
        };
        fetchLeaderBoard();
    }, []);

    return (
        // If leaderboard is empty, simply display a message. Else, display the different ranks with username and score using map
        <div className="main_leaderboard">
            <h1><u>Leaderboard</u></h1>
            {leaderBoard.length === 0 ? (
                <p className="no_scores">No scores available</p>
            ) : (
                leaderBoard.map((category, index) => (
                    <div key={index}>
                        <h3>{category.category}</h3>
                        <hr></hr>
                        <ol>
                            {category.scores.map((entry, idx) => (
                                <li key={`${entry.username}-${entry.score}`}>
                                    <span>{idx+1}. {entry.username}</span>
                                    <span>{entry.score} p</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                ))
            )}
        </div>
    );
};

export default LeaderBoard;