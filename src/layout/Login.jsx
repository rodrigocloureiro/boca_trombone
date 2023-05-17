import style from './Login.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ handleValidation }) {
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');

  // Atribui o valor digitado no input à variável login e adiciona erro caso não preenchido corretamente
  const handleLogin = (e) => {
    setLogin(e.target.value);
    const warning = document.querySelector('#login_warning');
    const pattern = e.target.pattern;
    if(login !== ''&& login.match(pattern) === null) {
      e.target.classList.add(style.error);
      warning.classList.add(style.warning);
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove(style.warning);
    }
  };

  // Atribui o valor digitado no input à variável password e adiciona erro caso não preenchido corretamente
  const handlePassword = (e) => {
    setPassword(e.target.value);
    const warning = document.querySelector('#pass_warning');
    const pattern = e.target.pattern;
    if(password !== ''&& password.match(pattern) === null) {
      e.target.classList.add(style.error);
      warning.classList.add(style.warning);
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove(style.warning);
    }
  };

  return (
    <main>
      
      <section className={ style.login_section }>
        
        <div className={ style.container }>
          
          <div className={ style.form_modal }>
          
            <h2>Login</h2>

              <form>

                <div>

                  <label htmlFor="login">Login</label>
                  
                  <div className={ style.ipt_login }>
                    
                    <i className="bi bi-person"></i>
                    
                    <input type="text" name="login" id="login" value={login} placeholder="Digite seu username com @" minLength="3" maxLength="15" required pattern="^(?=.*[A-Za-z0-9]$)([@])[A-Za-z\d.-]{2,15}$" onChange={ (e) => handleLogin(e) } />

                  </div>

                  <label id='login_warning' className={ style.login_warning }>3 a 15 caracteres. Deve começar com @</label>
                  
                </div>

                <div>

                  <label htmlFor="senha">Senha</label>
                  
                  <div className={ style.ipt_pass }>
                    
                    <i className="bi bi-shield-lock"></i>
                    
                    <input type="password" name="senha" id="senha" value={password} placeholder="Digite sua senha" minLength="8" maxLength="16" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" onChange={ (e) => handlePassword(e) } />
                    
                  </div>

                  <label id='pass_warning' className={ style.pass_warning }>8 a 16 caracteres, incluindo pelo menos um símbolo, letra maiúscula e número</label>
                  
                </div>

                <label id='general_warning' className={ style.general_warning }>Login ou senha incorretos</label>

                <div className={ style.btn_login }>
                  
                  <Link to='/' onClick={ (e) => handleValidation(e, login, password) }>Login</Link>
                
                </div>

                <div className={ style.signUp }>
                  
                  <p>Não é cadastrado?</p>
                  
                  <Link to="/signup" title="Cadastre-se">Clique aqui!</Link>
                
                </div>
                
              </form>
              
          </div>
              
        </div>
          
      </section>
      
    </main>
  );
}

export default Login;
