
import {useState} from 'react'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = ({onLogIn}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
            if(isLoggedIn){
                isLoggedIn(data);
            }
            resetInputFields();
            setError('');
        } catch(error){
            console.error('Error:', error);
            toast.error('Wrong username or password. Please try again');
            setError("Wrong username or password. Please try again");
            resetInputFields();
        }
    }

    return (
        <div className='form'>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    className='username_input'
                    name='username_input'
                    type="text"
                    value={username}
                    onChange={handleUsername}
                    placeholder='username'
                    required
                />
                <label>Password</label>
                <input 
                    className='password_input'
                    name='password_input'
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder='password'
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <ToastContainer/>
        </div>
    );
}
export default LogIn;