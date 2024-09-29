
import './QCard.css';
import { useState } from 'react';

// QCards represents the answer-options provided to the user
const QCard = () => {

    // Usestates for whether the option is chosen or not, and if the option is the correct answer

    const [isChosen, setIsChosen] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const value = 'option';

    // if already selected, deselect the option, else - select it
    const handleClick = () =>{
        if (isChosen){
            setIsChosen(false);
        }
        else{
            setIsChosen(true);
        }
    }

    return(
        <div className="main_card">
            <button className="card_btn" onClick={() => {handleClick}}>{value}</button>
        </div>
    );
}

export default QCard;