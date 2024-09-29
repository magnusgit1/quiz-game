
import './GamePage.css'
import QCard from './QCard.jsx';
import Question from './Question.jsx';

// component for the page where the game takes place
// using Question- and QCard-components to represent the interface

const GamePage = () => {


    return(
        <div className='main_gamepage'>
            <h2><Question/></h2>
            <div className='cards'>
                <div className="card_container">
                    <QCard/>
                    <QCard/>
                </div>
                <div className="card_container">
                    <QCard/>
                    <QCard/>
                </div>
            </div>
            <button onClick={() => {handleLockIn}}>Lock Answer</button>
        </div>
    );
}
export default GamePage;