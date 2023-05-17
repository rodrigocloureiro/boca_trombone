import logoface from '../../src/assets/images/facebook.svg';
import logoinsta from '../../src/assets/images/instagram.svg';
import logotwitter from '../../src/assets/images/twitter.svg';
import { Component } from 'react';

// Renderiza o Footer
class Footer extends Component {
    render() {
        return (
            <footer>

                <div className='container'>

                    <div className='socials'>

                        <a href="#" title="Facebook"><img src={ logoface } alt="Facebook icon" /></a>

                        <a href="#" title="Instagram"><img src={ logoinsta } alt="Instagram icon" /></a>

                        <a href="#" title="Twiiter"><img src={ logotwitter } alt="Twitter icon" /></a>

                    </div>

                    <div>

                        <p>© 2023 Boca no Trombone</p>

                    </div>

                </div>

            </footer>
        );
    }
}

export default Footer;
