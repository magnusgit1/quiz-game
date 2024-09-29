
import './QCard.css';
import { useState } from 'react';

const QCard = () => {

    const [isChosen, setIsChosen] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const value = 4;

    const handleClick = () =>{
        if (isChosen){
            return;
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