
import './QCard.css';

const QCard = ({ question, answers, timer, onAnswerSelected }) => {

    return(
        <div className="main_qcard">
            <h2>{question}</h2>
            <ul>
                {answers.map((answer, index) =>(
                    <li key={index} onClick={() => onAnswerSelected(answer)}>{answer.text}</li>
                ))}
            </ul>
            <p>Timer: {timer}</p>
        </div>
    );
};
export default QCard;