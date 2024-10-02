
// component for the page where the game takes place
// uses QCard-components which represents both the questions and the answers

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QCard from './QCard';

const GamePage = () => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(10);
    const [score, setScore] = useState(0);

    const { state } = useLocation();
    const { category, difficulty } = state;
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve questions and answers from server based on diff. and cat.
        axios.get('/api/questions/', { params: { category, difficulty }})
            .then(response =>{
                const formattedQuestions = response.data.map(item => ({
                    text: item.question_text,
                    correctAnswer: item.correct_answer,
                    answerAlternatives: [item.correct_answer, ...item.incorrect_answers]
                }));
                setQuestions(formattedQuestions);
            })
            .catch(error =>{
                console.error('Error fetching questions from api', error);
            });
    }, [category, difficulty]);

    useEffect(() => {
        if(timer > 0){
            const countdown = setTimeout(() => setTimer(timer-1), 1000);
            return () => clearTimeout(countdown);
        }
        // If the timer goes down to 0, go to next question automatically
        else if(currentQuestionIndex < questions.length - 1){
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setTimer(10);
        } else {
            // End of game 
        }
    }, [timer, currentQuestionIndex, questions.length]);

    const handleAnswerClick = (answer) => {
        if(answer === questions[currentQuestionIndex].correctAnswer){
            setScore(score + 5 + (timer));
        }
        if(currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex +1);
            setTimer(10);
        } else{
            navigate('/endpage');
        }
    };

    // If questions are still loading, display a loading screen
    if(!questions.length) return <div>Loading question...</div>;

    return(
        <div className="main_gamepage">
            <QCard 
                question={questions[currentQuestionIndex].text}
                answers={questions[currentQuestionIndex].answerAlternatives}
                timer={timer}
                onAnswerSelected={handleAnswerClick}
            />
            <p>Score: {score}</p>
        </div>
    );
};

export default GamePage;
