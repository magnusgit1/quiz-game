import "./HomePage.css";
const HomePage = () => {


    return (
        <div className='main'>
            <div className='welcome_section'>
                <h1>Welcome to Quizorama</h1>
                <div className='get_started'>
                    <h2>How would you like to play?</h2>
                    <div className='get_started_btns'>
                        <button className='offline_btn'>
                            Play Offline
                        </button>
                        <button className='sign_in_btn'>
                            Sign Up
                        </button>
                        <button className='login_btn'>
                            Login as existing user
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default HomePage;