
import './Question.css';
import { useState } from 'react';

// comp for the questions to be asked in the GamePage

const Question = () => {

    const [value, setValue] = useState('');

    return(
        <>
            <h1 className="q_h2">(question)?</h1>
        </>
    )
}
export default Question;