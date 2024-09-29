
import './Question.css';
import { useState } from 'react';

const Question = () => {

    const [value, setValue] = useState('');

    return(
        <>
            <h1 className="q_h2">Hvor sta er Maiken?</h1>
        </>
    )
}
export default Question;