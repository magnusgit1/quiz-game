
import './HowToPlay.css'

const HowToPlay = () => {
    
    return(
        <div className='main_howtoplay'>
        <div className='main_init_howtoplay'>
            <h1>How To play</h1>
            <p> 
                The game is implemented in a way such that only registered players
                will have their high-scored saved - and thus applicable to be a part of the leaderbord. <br></br> <br></br>

                The game consists of a few mandatory parts - firstly, one needs to choose 
                a category in which they want to test their knowledge. Secondly, the player needs 
                to choose the difficulty of the quiz. This ranges between easy, which are rather trivial questions,
                to hard, which requires more in-depth knowledge and/or interest in the field. <br></br> <br></br>

                After both the category and the difficulty is chosen, the player will be redirected to the actual game.
                Here the rules are simple - a question will appear on the top-side of the game-screen, and the player 
                has a total of 10 seconds to decide which answer between the four options provided, they want to lock in.
                After the 10 seconds, or if the player chooses to click the lock-in button early, the screen will display
                which answer was correct, and grant the player points if their answer matched the correct one.
                After all the questions have been answered, the player will be presented with their total score of the quiz. <br></br> <br></br>

                In addition to getting points for correct answers, the players will also be rewarded points depending on how 
                quickly they lock in their answer. 

                The point system works as follows: <br></br>
                <ul>
                    <li>Correct answer grants 5 points</li>
                    <li>Each second the player saves of the clock, will result in 1 additional point</li>
                    <li>For example, if the answer is locked in only after the clock runs out, the player will be awarded 5 points</li>
                    <li>If the player locks in when the timer shows 9 seconds remaining, they will be granted 5 + 9 = 14 points</li>
                </ul>
                <br></br>

                There will also be separate leaderbords for the different difficulties, meaning 
                one can hold the best score for the easy-mode, while another holds the best score of the medium-mode.
                <br></br>
                <br></br>
                Good quizzing!
            </p>
        </div>
        </div>
    );
}
export default HowToPlay;