
import './About.css';

// component with general information about me as a dev, and the background for the app

const About = () => {
    return (
        <div className='main_about'>
        <div className='main_init_about'>
            <h1>About</h1>
            <p>
                I am a student at the University of Oslo, working towards my degree in Informatics and Computer Science.
                In parallell with my degree, I am trying to apply my theoretical knowledge to create functional and real-life
                applications. In this project specifically, i am focusing on applying my newly developed (and partly self-learned)
                front-end skills, to create a simple quiz-game-website. I also learned alot about server-side programming, where
                i implemented authentication-based login-functionality, including registering new accounts, storing high-scores and data
                configuration aquired from the users with the use of jwt, dj-auth and rest-frameworks from Django in Python.
                The learning curve has been rather steep, but i truly enjoy the process, and learn alot from all the mistakes and debugging
                i stumble upon in the process. <br></br>

                <h2><u>Tech stack</u></h2>
                <h3>Frontend</h3>
                <ul className='tech_stack'>
                    <li>React with:</li>
                    <ul>
                        <li>HTML, CSS, Javascript (jsx) </li>
                    </ul>
                </ul>
                <h3>Backend</h3>
                <ul className='tech_stack'>
                    <li>Python with:</li>
                    <ul>
                        <li>Django (dj-auth etc.) </li>
                        <li>PostgreSQL</li>
                    </ul>
                </ul>
            </p>
        </div>
        </div>
    );
}
export default About;