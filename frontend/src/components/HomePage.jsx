import "./HomePage.css";
import { useState } from 'react';
import Register from './Register';
import LogIn from './LogIn';
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentComponent, setCurrentComponent] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = (data) => {
        console.log('User signed up successfully:', data);
        setIsRegistered(true);
        setCurrentComponent('login');
    };

    const handleLogIn = (data) => {
        console.log('User has logged in successfully:', data);
        setIsLoggedIn(true);
        navigate('/GamePage');
    }

    return (
        <div className='main'>
            <div className='welcome_section'>
                {currentComponent === null && <h1>Welcome to Quizorama</h1>}
                {currentComponent === 'register' ? (
                    <Register onSignUp={handleSignUp}/> 
                    ) : currentComponent === 'login' ? (
                        <LogIn onLogIn={handleLogIn}/>
                    ) : (
                        <div className='get_started'>
                            <h2>How would you like to play?</h2>
                            <div className='get_started_btns'>
                                <button className='offline_btn' onClick={() => navigate('/GamePage')}>
                                    Play Offline
                                </button>
                                <button className='sign_in_btn' onClick={() => setCurrentComponent('register')}>
                                    Sign Up
                                </button>
                                <button className='login_btn' onClick={()=> setCurrentComponent('login')}>
                                    Login
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default HomePage;