import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import AuthContext from '../AuthContext';
import { useContext } from "react";


// Component for the front-page of the site, which presents options of playing offline, signing up or logging in.
// Utilizing Navigate() to present the different interfaces in the home-page.
const HomePage = () => {

    const { isLoggedIn, logOut, logIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = async () =>{
        if(isLoggedIn){
            console.log(isLoggedIn)
            await logOut();
            navigate('/');
        }
    };

    console.log('Is logged in:', isLoggedIn);

    return (
        <div className='main_homepage'>
            <div className='welcome_section'>
                <h1>Welcome to Quizorama</h1>
                <hr></hr>
                <div className='get_started'>
                    <h2>How would you like to play?</h2>
                    <div className='get_started_btns'>
                        <button className='offline_btn' onClick={() => navigate('/categorypage')}>
                            Play Offline
                        </button>
                        <button className='sign_in_btn' onClick={() => navigate('/register')}>
                            Sign Up
                        </button>
                        {isLoggedIn ? 
                            <button className='login_btn' onClick={handleLogOut}>
                                Logout
                            </button>
                            :
                            <button className='login_btn' onClick={()=> navigate('/login')}>
                                Login
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;