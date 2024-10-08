
import './App.css'
import {HashRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import LogIn from './components/LogIn/LogIn';
import About from './components/About/About';
import HowToPlay from './components/HowToPlay/HowToPlay';
import Register from './components/Register/Register';
import GamePage from './components/GamePage/GamePage';
import CategoryPage from './components/GamePage/CategoryPage';
import DifficultyPage from './components/GamePage/DifficultyPage';
import EndPage from './components/GamePage/EndPage';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import PrivacyPolicy from './components/Register/PrivacyPolicy';
import { AuthProvider } from './components/AuthContext';
import { UserProvider } from './components/UserContext';

// Main app, includes Router to use navigate throughout the components.

function App() {

  return (
    <UserProvider>
    <AuthProvider>
      <Router>
        <div className='first_page'>
          <div className='topmenu'>
            <nav>
              <Link className='topmenu-item' to='/'>
                <u>Home</u>
              </Link>
              <Link className='topmenu-item' to='/about'>
                <u>About</u>
              </Link>
              <Link className='topmenu-item' to='/how-to-play'>
                <u>How to play</u>
              </Link>
              <Link className='topmenu-item' to='/leaderboard'>
                <u>Leaderboard</u>
              </Link>
              <img src="https://img.freepik.com/premium-vector/quiz-logo-with-speech-bubble-icon_149152-812.jpg"/>
            </nav>
          </div>
          <div className='home_page'>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/login' element={<LogIn/>} />
              <Route path='/gamepage' element={<GamePage/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/how-to-play' element={<HowToPlay/>} />
              <Route path='/categorypage' element={<CategoryPage/>} />
              <Route path='/difficultypage' element={<DifficultyPage/>} />
              <Route path='/endpage' element={<EndPage/>} />
              <Route path='/leaderboard' element={<LeaderBoard/>} />
              <Route path='/privacypolicy' element={<PrivacyPolicy/>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <div className="footer_fp">
            <Footer/>
          </div>
        </div>
      </Router>
    </AuthProvider>
    </UserProvider>
  );
}

export default App;
