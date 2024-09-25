
import './App.css'
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import LogIn from './components/LogIn';
import About from './components/About';
import HowToPlay from './components/HowToPlay';
import Register from './components/Register';
import GamePage from './components/GamePage';


function App() {

  return (
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <div className="footer_fp">
          <Footer/>
        </div>
      </div>
    </Router>
  );
}

export default App;
