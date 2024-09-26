
import {useState} from 'react'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LogIn.css';
import { useNavigate } from "react-router-dom";

const LogIn = ({onLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleUsername = (e) =>{
        setUsername(e.target.value);
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const resetInputFields = () =>{
        setUsername('');
        setPassword('');
    }

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
            console.log('Success:', data); // presents the successmsg to the console
            toast.success("Login successful, welcome back!", {
                onClose: () =>{
                    navigate('/GamePage');
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
                    <button type="submit">Log in</button>
                </form>
                <ToastContainer/>
            </div>
        </div>
    );
}
export default LogIn;