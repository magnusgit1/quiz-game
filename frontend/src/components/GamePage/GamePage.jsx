
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QCard from './QCard';
import './GamePage.css';
import { shuffleArray } from './utils';
import TimerBar from './TimerBar';

const GamePage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);

    // To avoid simoultanious function-calls
    const isTransitioning = useRef(false);

    // useRef to collect remaining time from TimerBar
    const timerBarRef = useRef(null);

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
                const response = await fetch(`https://quizbackend-2egv.onrender.com/api/questions/?category=${category}&difficulty=${difficulty}`);
                if (!response.ok) {
                    throw new Error(`HTTP error; status: ${response.status}`);
                }
                const data = await response.json();
                console.log('API response:', data);

                if (Array.isArray(data)) {
                    const formattedQuestions = data.map(item => ({
                        text: item.question_text,
                        // Randomize the choice-orders
                        choices: shuffleArray(item.choices.map(choice => ({
                            text: choice.choice_text,
                            isCorrect: choice.is_correct
                        })))
                    }));

                    // first find questions where the corresponding choices are actually present (>0)
                    const validQuestions = formattedQuestions.filter(q => q.choices && q.choices.length > 0);
                    // Then shuffle the questions so that it will always be in random order 
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
        if (isQuizFinished) {
            navigate('/endpage', { state: { score, category, difficulty } });
        }
    }, [isQuizFinished, navigate, score, category, difficulty]);

    // Handles the case where an answer is not clicked and the timer runs out
    // Uses transitioning.current to make sure both handleanswerclick and handletimeup does not occur simoultaniously
    const handleTimeUp = () => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsQuizFinished(true);
        }
        isTransitioning.current = false;
    };

    // Handles the action of the player clicking an answer
    const handleAnswerClick = (answer) => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;

        if (answer.isCorrect) {
            const remainingTime = timerBarRef.current.getTimeLeft(); // Get remaining time
            const totalScore = 5 + remainingTime; // 5 points for correct answers, plus the remaining time in seconds (int) as points
            setScore(prevScore => prevScore + totalScore); // update the score
        }

        // Wait 1 second before displaying the EndPage
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            } else {
                setIsQuizFinished(true);
            }
            isTransitioning.current = false;
        }, 1000);
    };

    // If questions are still loading, display a loading screen
    if (!questions.length) return <div>Loading question...</div>;

    return (
        <div className="main_gamepage">
            <TimerBar ref={timerBarRef} key={currentQuestionIndex} duration={10} onTimeUp={handleTimeUp} />
            <div className="qcard_container">
                <QCard 
                    question={questions[currentQuestionIndex].text}
                    answers={questions[currentQuestionIndex].choices}
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
