import './Register.css';
import {useState} from 'react';

const Register = ({onSignUp}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUserName = (e) =>{
        setUserName(e.target.value);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();


    }


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
                    placeholder='username'
                    required
                />
                <label>Password</label>
                <input 
                    type="password"
                    className='password_input'
                    name='password_input'
                    value={password}
                    onChange={handlePassword}
                    placeholder='password'
                    required
                />
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}

export default Register;