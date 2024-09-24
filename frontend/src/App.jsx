import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import Footer from './components/Footer';

function App() {

  return (
    <>
      <div className='first_page'>
        <div className='topmenu'>
          <nav>
            <a className='topmenu-item'
              src='https://magnusgit1.github.io/quiz-game/'>
              <u>Home</u>
            </a>
            <a className='topmenu-item'
              //src= source to about-page
              ><u>About</u></a>
            <a className='topmenu-item'
              //src= source to how-to-play page
              ><u>How to play</u>
            </a>
            <img src="https://img.freepik.com/premium-vector/quiz-logo-with-speech-bubble-icon_149152-812.jpg"/>
          </nav>
        </div>
        <div className='home_page'>
          <HomePage/>
        </div>
        <div className="footer_fp">
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default App
