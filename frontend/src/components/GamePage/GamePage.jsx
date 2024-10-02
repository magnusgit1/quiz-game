import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QCard from './QCard';
import './GamePage.css';
import { shuffleArray } from './utils';

const GamePage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(10);
    const [score, setScore] = useState(0);

    const { state } = useLocation();
    const { category, difficulty } = state || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (!category || !difficulty) {
            console.error('Category or difficulty is missing');
            return;
        }
        // Retrieve questions and answers from server based on difficulty and category
        console.log(`Fetching questions with category: ${category} and difficulty: ${difficulty}`);
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/questions/?category=${category}&difficulty=${difficulty}`);
                if (!response.ok) {
                    throw new Error(`HTTP error; status: ${response.status}`);
                }
                const data = await response.json();
                console.log('API response:', data);
                
                if (Array.isArray(data)) {
                    const formattedQuestions = data.map(item => ({
                        text: item.question_text,
                        // Shuffling the array using shuffleArray to avoid correct answer always being first
                        choices: shuffleArray(item.choices.map(choice => ({
                            text: choice.choice_text,
                            isCorrect: choice.is_correct
                        })))
                    }));
                    const validQuestions = formattedQuestions.filter(q => q.choices && q.choices.length > 0);
                    const randomQuestions = shuffleArray(validQuestions).slice(0, 10);
                    setQuestions(randomQuestions);
                } else {
                    console.error('Unexpected response format:', data);
                }
            } catch (error) {
                console.error('Error fetching questions from API', error);
            }
        };

        fetchQuestions();
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
        if(answer.isCorrect){
            setScore(score + 5 + (timer));
        }
        if(currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex +1);
            setTimer(10)        
        } else{
            navigate('/endpage', { state: { score: score } });
        }
    };

    // If questions are still loading, display a loading screen
    if(!questions.length) return <div>Loading question...</div>;

    return(
        <div className="main_gamepage">
            <div className="qcard_container">
                <QCard 
                    question={questions[currentQuestionIndex].text}
                    answers={questions[currentQuestionIndex].choices}
                    timer={timer}
                    onAnswerSelected={handleAnswerClick}
                />
            </div>
            <div className="scoreboard">
                <p>Score: {score}</p>
            </div>
        </div>
    );
};

export default GamePage;
