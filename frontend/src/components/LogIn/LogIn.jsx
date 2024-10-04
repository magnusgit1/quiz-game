
import {useState, useContext} from 'react'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LogIn.css';
import { useNavigate } from "react-router-dom";
import AuthContext from '../AuthContext';
import UserContext from '../UserContext';

// Component that displays the log-in interface
// User is able to provide username and password into a form, and submit the input
const LogIn = ({onLogin}) => {

    // Usestates to hold the values of username, password, possible errors and initiating the navigate-module
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { logIn } = useContext(AuthContext);
    const { setUserName } = useContext(UserContext);

    // functions to handle events
    const handleUsername = (e) =>{
        setUsername(e.target.value);
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const handleReturn = () =>{
        navigate("/homepage");
    }

    // function that refreshes the input-fields once submitted
    const resetInputFields = () =>{
        setUsername('');
        setPassword('');
    }

    // main functionality is implemented here
    // once submitted, this function will be called, and the following actions occurs:
    // 1. Prevent any default action connected to submitting a form
    // 2. Using fetch to connect to the backend-api with POST
    // 3. Translates the content using JSON
    // 4. If the connection (response) is successful, the username and password matches and the user is authenticated
    // 5. The success-msg is stored in the data const.
    // 6. After the msg has been displayed, the user is redirected to the game-page.
    // 7. If the user has provided faulty inputs, an error will be displayed, and the input-fields will be reset.

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username:username,
                    password:password
                }),
            });
            if(!response.ok){ // if response is faulty then
                throw new Error(`HTTP error; status: ${response.status}`);
            }
            const data = await response.json();
            sessionStorage.setItem('token', data.token);
            console.log('Success:', data); // presents the successmsg to the console
            setUserName(username);

            //Declare the user logged in through useContext
            logIn();

            toast.success("Login successful, welcome back!", {
                onClose: () =>{
                    navigate('/categorypage');
                    resetInputFields();
                    setError('');
                }, autoClose: 1000,
            });
            if(onLogin){
                onLogin(data);
            }
        } catch(error){
            console.error('Error:', error);
            toast.error('Wrong username or password. Please try again');
            setError("Wrong username or password. Please try again");
            resetInputFields();
        }
    }

    // jsx consists of a form which calls handleSubmit on submit, and changes the states of username and password
    // through the inputs' onChange and value
    // ToasterContainer is also utilized for displaying messages to the user.
    return (
        <div className='main_login'>
            <div className='form_login'>
                <h2>Login</h2>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input 
                        className='username_input'
                        name='username_input'
                        type="text"
                        value={username}
                        onChange={handleUsername}
                        required
                    />
                    <label>Password</label>
                    <input 
                        className='password_input'
                        name='password_input'
                        type="password"
                        value={password}
                        onChange={handlePassword}
                        required
                    />
                    <div className="login_btns">
                        <button type="submit">Log in</button>
                    </div>
                </form>
                <button className="return_button" onClick={handleReturn}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTui8SEhHoRANPBhhYMh2HmA8ti2WFrhwkN13SVwIUv_-7jWbh6ghRZPKbXRFUnUEAsjrg&usqp=CAU"/></button>
                <ToastContainer/>
            </div>
        </div>
    );
}
export default LogIn;