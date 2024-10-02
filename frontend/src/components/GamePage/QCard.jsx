
import './QCard.css';

const QCard = ({ question, answers, timer, onAnswerSelected }) => {

    return(
        <div className="main_qcard">
            <h2>{question}</h2>
            <hr></hr>
            <div className="qcard">
                {answers.map((answer, index) =>(
                    <button className="choice_btn" key={index} onClick={() => onAnswerSelected(answer)}>{answer.text}</button>
                ))}
            </div>
            <p>Timer: {timer}</p>
        </div>
    );
};
export default QCard;