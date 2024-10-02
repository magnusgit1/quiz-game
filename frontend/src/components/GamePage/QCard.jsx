
import './QCard.css';
import { useState } from 'react';

const QCard = ({ question, answers, onAnswerSelected }) => {
    
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerClick = (answer) =>{
        setSelectedAnswer(answer);
        onAnswerSelected(answer);
        setTimeout(() => {
            setSelectedAnswer(null);
        }, 1000);
    };

    return(
        <div className="main_qcard">
            <h2>{question}</h2>
            <hr></hr>
            <div className="answers-container">
                {answers.map(answer =>(
                    <button 
                        key={answer.text}
                        className={`choice_btn ${selectedAnswer === answer ? (answer.isCorrect ? 'correct' : 'incorrect') : ''}`}
                        onClick={() => handleAnswerClick(answer)}
                        disabled={selectedAnswer !== null}
                        >{answer.text}</button>
                ))}
            </div>
        </div>
    );
};
export default QCard;