import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className='main_homepage'>
            <div className='welcome_section'>
                <h1>Welcome to Quizorama</h1>
                <hr></hr>
                <div className='get_started'>
                    <h2>How would you like to play?</h2>
                    <div className='get_started_btns'>
                        <button className='offline_btn' onClick={() => navigate('/GamePage')}>
                            Play Offline
                        </button>
                        <button className='sign_in_btn' onClick={() => navigate('/register')}>
                            Sign Up
                        </button>
                        <button className='login_btn' onClick={()=> navigate('/login')}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;