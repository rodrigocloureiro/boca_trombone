import logotipo from '../../src/assets/images/logo.png';
import menuImg from '../../src/assets/images/list.svg';
import buscarImg from '../../src/assets/images/search.svg';
import Input from './Input';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { BsBoxArrowInRight } from "react-icons/bs";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { handleMobileMenu, handleSuggestions, event, logado, usuario, logout, definicao, handleNavigateSuggestions } = this.props;

    return (
      <header>

        <div className='container'>

          <div className='logo-area'>

            <Link to='/' title='Home'>
              <img src={ logotipo } alt="Logotipo Boca no Trombone" />
            </Link>

          </div>

          <div className='search-area'>
            
            <Input type='text' placeholder='Digite o nome ou CNPJ da empresa' id='search' className='search_input' event={ handleSuggestions } autoComplete='off' handleNavigateSuggestions={ handleNavigateSuggestions } />

            <div className='suggestions'></div>

            <Link to='/historico' role="button" className='header_btn' onClick={ event }>
              <img src={ buscarImg } alt="Buscar" />
            </Link>

          </div>

          {
            !logado ? (
              <nav className='buttons-area'>
  
              <ul>
  
                <li>

                  <Link to='/signup' className='btn_signup' title='Cadastre-se'>Cadastre-se</Link>
  
                </li>
  
                <li>
  
                  <Link to='/login' className='btn_login' title='Login'>Login</Link>
  
                </li>
  
              </ul>
  
            </nav>
            ) : 
            (
              <div className='user-area'>
                
                <img className='user_avatar' src={ usuario.avatar } alt='User avatar' />
                
                <Link to='/' className='user-logout' onClick={ logout }>
                  
                  <BsBoxArrowInRight style={{ fontSize: 24 }} />

                  <p>Sair</p>
                  
                </Link>
                
              </div>
            )
          }

          <div className='mobile-menu'>

            <img className='menu-image' src={menuImg} alt="Menu" onClick={ handleMobileMenu } />

            <div id='menu' className='menu'>

              {
                !logado ? (

                  <>
      
                    <div className='signup-area'>

                      <Link to='/signup' className='btn_signup' title='Cadastre-se'>Cadastre-se</Link>
      
                    </div>
      
                    <div className='login-area'>
      
                      <Link to='/login' className='btn_login' title='Login'>Login</Link>
      
                    </div>

                  </>
                )
                :
                (
                  <div className='user-area'>
                  
                    <img className='user_avatar' src={ usuario.avatar } alt='User avatar' />

                    {
                      definicao === 'empresa' ? (
                        <>
                          <p className='user-info'>{ usuario.nome }</p>
                          <p className='user-info'>{ usuario.cnpj }</p>
                          <p className='user-info'>{ usuario.email }</p>
                        </>
                      ) : (
                        <>
                          <p className='user-info'>{ usuario.nome } { usuario.sobrenome }</p>
                          <p className='user-info'>{ usuario.email }</p>
                        </>
                      )
                    }
                    
                    <Link to='/' className='user-logout' onClick={ logout }>
                      
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
