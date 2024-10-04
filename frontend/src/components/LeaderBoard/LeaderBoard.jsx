
import { useEffect, useState } from 'react';
import './LeaderBoard.css';

const LeaderBoard = () => {
    const [leaderBoard, setLeaderBoard] = useState([]);

    useEffect(() => {
        const fetchLeaderBoard = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/leaderboard/');
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
                                    <span>{entry.username}</span>
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