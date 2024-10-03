
import './EndPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const EndPage = () => {

    const { state } = useLocation();
    const { score } = state;
    const navigate = useNavigate();

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