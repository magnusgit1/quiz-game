
import './PrivacyPolicy.css';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {

    const navigate = useNavigate();

    const handleReturn = () =>{
        navigate('/register');
    };

    return(
        <div className="main_pp">
            <h1>Privacy Policy</h1>
            <hr></hr>
            <p>
                We respect your privacy. This policy explains what data we collect, how its used and what rights you have as a user.
            </p>
            <h2>Data we collect</h2>
            <ul>
                <li>Username</li>
                <li>Password (encrypted)</li>
                <li>High scores (only if they reach the leaderboards) </li>
            </ul>
            <h2>How we use your data</h2>
            <p>Your data will exclusively be used for you to access our services and to enter the leaderboard. By taking the quiz, you accept that your score might be displayed in the leaderboard along with your username.</p>
            <h2>Your rights</h2>
            <p>You have the right to delete your registered accounts - contact me on magnus.h@wemail.no for help. </p>
            <button className="return_button" onClick={handleReturn}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTui8SEhHoRANPBhhYMh2HmA8ti2WFrhwkN13SVwIUv_-7jWbh6ghRZPKbXRFUnUEAsjrg&usqp=CAU"/></button>
        </div>
        
    );
};
export default PrivacyPolicy;