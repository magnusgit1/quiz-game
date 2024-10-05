
import './HowToPlay.css'

// Component to display information about the game and its rules.
const HowToPlay = () => {
    
    return(
        <div className='main_howtoplay'>
        <div className='main_init_howtoplay'>
            <h1>How to play</h1>
            <hr></hr>
            <p> 
                The game is implemented in a way such that only registered players
                will have their high-scored saved - and thus applicable to be a part of the leaderbord. <br></br> <br></br>

                The game consists of a few mandatory parts - firstly, one needs to choose 
                a category in which they want to test their knowledge. Secondly, the player needs 
                to choose the difficulty of the quiz. This ranges between easy, which are rather trivial questions,
                to hard, which requires more in-depth knowledge and/or interest in the field. <br></br> <br></br>

                After both the category and the difficulty is chosen, the player will be redirected to the actual game.
                Here the rules are simple - a question will appear on the top-side of the game-screen, and the player 
                has a total of 10 seconds to decide which answer between the four options provided they want to choose.
                After the 10 seconds, or if the player chooses an option, the screen will display
                which answer was correct, and grant the player points if their answer matched the correct one.
                After all the questions have been answered, the player will be presented with their total score of the quiz, 
                along with a message that lets the player know whether or not the score will enter the leaderboard. <br></br> <br></br>

                In addition to getting points for correct answers, the players will also be rewarded points depending on how 
                quickly they lock in their answer. 

                The point system works as follows: <br></br>
                <ul>
                    <li>Correct answer grants 5 points</li>
                    <li>Each second the player saves of the clock, will result in 1 additional point</li>
                    <li>For example, if the answer is chosen only after the clock runs out, the player will be awarded 5 points</li>
                    <li>If the player chooses the right answer when the timer shows 9 seconds remaining, they will be granted 5 + 9 = 14 points</li>
                </ul>
                <br></br>

                There will also be separate leaderbords for the different categories, meaning 
                one player can hold scores in the leaderboard in different categories, across ranks.
                <br></br>
                <br></br>
                Good quizzing!
            </p>
        </div>
        </div>
    );
}
export default HowToPlay;