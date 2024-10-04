
import './EndPage.css';
import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../UserContext';

const EndPage = () => {
    const { state } = useLocation();
    const { score, category } = state || {};
    const navigate = useNavigate();
    const { userName } = useContext(UserContext);

    console.log('Render: ', {userName, score, category });
    useEffect(() => {
        
        const postScore = async() => {
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

                const data = await response.json();
                console.log(data);

            } catch (error) {
                console.error('Failed to post score:', error);
            }
        };

        if (userName && score != null && category) {
            postScore();
        }

    }, [userName, score, category]);

    return(
        <div className="main_endpage">
            <h1>Final Score</h1>
            <hr></hr>
            <p>{score}</p>
            <button className="exit_btn" onClick={() => navigate('/')}>
                Exit
            </button>
        </div>
    );
};

export default EndPage;