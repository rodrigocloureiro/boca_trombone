import logoface from '../../src/assets/images/facebook.svg';
import logoinsta from '../../src/assets/images/instagram.svg';
import logotwitter from '../../src/assets/images/twitter.svg';
import { Component } from 'react';
import style from './Footer.module.css';

// Renderiza o Footer
class Footer extends Component {
    render() {
        return (
            <footer className={style.footer}>

                <div className={style.container}>

                    <div className={style.socials}>

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
