
const HomePage = () => {


    return (
        <div className='main'>
            <div className='nav-bar'>
                <nav>
                    <a className='topmenu'
                        src='https://magnusgit1.github.io/quiz-game/'>
                        <u>Home</u>
                    </a>
                    <a className='topmenu'
                        //src= source to how-to-play page
                        ><u>How To Play</u>
                    </a>
                </nav>
            </div>
            <div className='welcome-section'>
                <h1>Welcome to Quizorama</h1>
                <div className='get-started'>
                    <h2>How would you like to play?</h2>
                    <div className='get-started-btns'>
                        <button className='login-btn'>
                            Login as existing user
                        </button>
                        <button className='sign-in-btn'>
                            Sign Up
                        </button>
                        <button className='offline-btn'>
                            Play Offline
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default HomePage;