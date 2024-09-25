import './Register.css';
import {useState} from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({onSignUp}) => {

    // Create state-variables for username, password and password-confirmation
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');


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

    // the functionality for the submit-button once a user
    // has filled in the form and tries to create the new account.
    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        // Checking if passwords match
        if(password !== passwordConfirm){
            setError('Passwords do not match');
            toast.error('Passwords do not match');
        }
        
        try{
            const response = await fetch('http://localhost:8000/api/register/', {
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
    };

    return(
        <div className='form'>
            <h2>Create new Account</h2>
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
                <button type="submit">Sign up</button>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default Register;