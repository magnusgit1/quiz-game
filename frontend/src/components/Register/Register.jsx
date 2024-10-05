import './Register.css';
import {useState} from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";

// Component for registration of a user account
// User provides a username, a password and a password-confirmation through the input-fields
const Register = ({onSignUp}) => {

    // Create state-variables for username, password and password-confirmation, as well as possible errors
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    // event-handler functions
    const handleUserName = (e) =>{
        setUserName(e.target.value);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const handlePasswordConfirm = (e) =>{
        setPasswordConfirm(e.target.value);
    }

    const resetInputFields = () =>{
        setUserName('');
        setPassword('');
        setPasswordConfirm('');
    }

    const handleReturn = () =>{
        navigate("/homepage");
    }


    // the functionality for the submit-button once a user
    // has filled in the form and tries to create the new account.

    // 1. Prevent any submit-defaults
    // 2. Check if the passwords match, if not, display error msg and refresh input-fields
    // 3. if passwords match, create response to the backend-api with fetch
    // 4. If the connection is successful, the user is created in the database, and a successmessage is displayed
    // 5. If the connection is faulty, an error is displayed, and inputs refreshed
    // 6. After succesfully creating the account, the user is redirected to the login-page

    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        // Checking if passwords match
        if(password !== passwordConfirm){
            setError('Passwords do not match');
            toast.error('Passwords do not match');
            resetInputFields();
            return;
        }
        else{
            try{
                const response = await fetch('https://quizbackend-2egv.onrender.com/api/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username:userName, 
                        password:password, 
                        password2:passwordConfirm
                    }),
                });

                if(!response.ok){ // if response is faulty then
                    throw new Error(`HTTP error; status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Success:', data); // presents the successmsg to the console

                toast.success("Account Created!", {
                    onClose: () =>{
                        navigate('/login');
                        resetInputFields();
                        setError('');
                    }, autoClose: 1000,
                });

                // Using prop to trigger the callback if provided through a parent component
                if(onSignUp){
                    onSignUp(data);
                }
                resetInputFields();
                setError('');

            } catch(error){
                console.error('Error:', error);
                toast.error('An error has occured during registration. Please try again.')
                setError("An error has occured during registration. Please try again.");
            }
        }
    };

    // jsx with a form that utilizes the handle-submit function
    // state-variables are dependant on the inputs' value and onChange.
    // includes ToastContainer for styled message-display.

    return(
        <div className='main_register'>
            <div className='form_register'>
                <h2>Create new Account</h2>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <label>New Username</label>
                    <input 
                        type="text"
                        className='username_input' 
                        name='username_input'
                        value={userName}
                        onChange={handleUserName}
                        required
                    />
                    <label>Password</label>
                    <input 
                        type="password"
                        className='password_input'
                        name='password_input'
                        value={password}
                        onChange={handlePassword}
                        required
                    />
                    <label>Confirm Password</label>
                    <input 
                        type="password"
                        className='password_confirm'
                        name='password_confirm'
                        value={passwordConfirm}
                        onChange={handlePasswordConfirm}
                        required 
                    />
                    <div className="accept_policy">
                        <input type="checkbox" name="consent" required/>
                        I accept the privacy policy. <Link to='/privacypolicy'>Read our privacy policy</Link>
                    </div>
                    <div className="reg_btns">
                        <button type="submit">Sign up</button>
                    </div>
                </form>
                <button className="return_button" onClick={handleReturn}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTui8SEhHoRANPBhhYMh2HmA8ti2WFrhwkN13SVwIUv_-7jWbh6ghRZPKbXRFUnUEAsjrg&usqp=CAU"/></button>
                <ToastContainer/>
            </div>
        </div>
    );
}

export default Register;