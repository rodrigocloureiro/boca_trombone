import logotipo from '../../src/assets/images/logo.png';
import menuImg from '../../src/assets/images/list.svg';
import buscarImg from '../../src/assets/images/search.svg';
import Input from './Input';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { BsBoxArrowInRight } from "react-icons/bs";
import style from './Header.module.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { handleMobileMenu, handleSuggestions, event, logado, usuario, logout, definicao, handleNavigateSuggestions } = this.props;

    return (
      <header className={style.header}>

        <div className={style.container}>

          <div className={style.logo_area}>

            <Link to='/' title='Home'>
              <img src={ logotipo } alt="Logotipo Boca no Trombone" />
            </Link>

          </div>

          <div className={style.search_area}>
            
            <Input type='text' placeholder='Digite o nome ou CNPJ da empresa' id='search' className={style.search_input} event={ handleSuggestions } autoComplete='off' handleNavigateSuggestions={ handleNavigateSuggestions } />

            <div className={style.suggestions} id='suggestions'></div>

            <Link to='/historico' role="button" className={style.header_btn} id='header_btn' onClick={ event }>
              <img src={ buscarImg } alt="Buscar" />
            </Link>

          </div>

          {
            !logado ? (
              <nav className={style.buttons_area}>
  
              <ul>
  
                <li>

                  <Link to='/signup' className={style.btn_signup} title='Cadastre-se'>Cadastre-se</Link>
  
                </li>
  
                <li>
  
                  <Link to='/login' className={style.btn_login} title='Login'>Login</Link>
  
                </li>
  
              </ul>
  
            </nav>
            ) : 
            (
              <div className={style.user_area}>
                
                <img className={style.user_avatar} src={ usuario.avatar } alt='User avatar' />
                
                <Link to='/' className={style.user_logout} onClick={ logout }>
                  
                  <BsBoxArrowInRight style={{ fontSize: 24 }} />

                  <p>Sair</p>
                  
                </Link>
                
              </div>
            )
          }

          <div className={style.mobile_menu}>

            <img className={style.menu_image} src={menuImg} alt="Menu" onClick={ handleMobileMenu } />

            <div id='menu' className={style.menu}>

              {
                !logado ? (

                  <>
      
                    <div className={style.signup_area}>

                      <Link to='/signup' className={style.btn_signup} title='Cadastre-se'>Cadastre-se</Link>
      
                    </div>
      
                    <div className={style.login_area}>
      
                      <Link to='/login' className={style.btn_login} title='Login'>Login</Link>
      
                    </div>

                  </>
                )
                :
                (
                  <div className={style.user_area}>
                  
                    <img className={style.user_avatar} src={ usuario.avatar } alt='User avatar' />

                    {
                      definicao === 'empresa' ? (
                        <>
                          <p className={style.user_info}>{ usuario.nome }</p>
                          <p className={style.user_info}>{ usuario.cnpj }</p>
                          <p className={style.user_info}>{ usuario.email }</p>
                        </>
                      ) : (
                        <>
                          <p className={style.user_info}>{ usuario.nome } { usuario.sobrenome }</p>
                          <p className={style.user_info}>{ usuario.email }</p>
                        </>
                      )
                    }
                    
                    <Link to='/' className={style.user_logout} onClick={ logout }>
                      
                      <BsBoxArrowInRight style={{ fontSize: 24 }} />
    
                      <p>Sair</p>
                      
                    </Link>
                    
                  </div>
                )
              }
              
            </div>

          </div>

        </div>

      </header>
    );
  }
}

export default Header;
