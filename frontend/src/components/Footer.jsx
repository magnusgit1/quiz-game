import './Footer.css';


const Footer = () =>{


    return (

        <div className='footer'>
            <div className='contact_me'>
                <h2>Contact me</h2>
                <ul>
                    <li>Email: magnus.h@wemail.no</li>
                    <li>GitHub: <a href="https://github.com/magnusgit1">magnusgit1</a></li>
                </ul>
            </div>
            <div className='faq'>
                <a //href faq-site
                >FAQ</a>
            </div>
        </div>
    )
}
export default Footer;