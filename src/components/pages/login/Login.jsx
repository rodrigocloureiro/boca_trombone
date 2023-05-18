import style from './Login.module.css';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Login({ handleValidation }) {
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');
  const loginWarningRef = useRef(); // label de aviso do login
  const passWarningRef = useRef(); // label de aviso do password
  const failedLoginRef = useRef(); // label de aviso login não sucedido
  
  // Adiciona erro caso não preenchido corretamente
  const handleInputValidation = (e, warning, regex) => {
    let value = e.target.value;
    const pattern = new RegExp(regex);
    failedLoginRef.current.classList.contains(style.warning) ? failedLoginRef.current.classList.remove(style.warning) : null;
    if(value === '' || !pattern.test(value)) {
      e.target.classList.add(style.error);
      warning.current.classList.add(style.warning);
    } else {
      e.target.classList.remove(style.error);
      warning.current.classList.remove(style.warning);
    }
  };

  // Atribui o valor digitado no input à variável login
  const handleLogin = (e, regex) => {
    setLogin(e.target.value);
    handleInputValidation(e, loginWarningRef, regex);
  };

  // Atribui o valor digitado no input à variável password
  const handlePassword = (e, regex) => {
    setPassword(e.target.value);
    handleInputValidation(e, passWarningRef, regex);
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
                    
                    <input type="text" name="login" id="login" value={login} placeholder="Digite seu username com @" minLength="3" maxLength="15" required onChange={ (e) => handleLogin(e, /^(?=.*[A-Za-z0-9]$)([@])[A-Za-z\d.-]{2,15}$/) } />

                  </div>

                  <label id='login_warning' ref={loginWarningRef} className={ style.login_warning }>3 a 15 caracteres. Deve começar com @</label>
                  
                </div>

                <div>

                  <label htmlFor="senha">Senha</label>
                  
                  <div className={ style.ipt_pass }>
                    
                    <i className="bi bi-shield-lock"></i>
                    
                    <input type="password" name="senha" id="senha" value={password} placeholder="Digite sua senha" minLength="8" maxLength="16" required onChange={ (e) => handlePassword(e, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) } />
                    
                  </div>

                  <label id='pass_warning' ref={passWarningRef} className={ style.pass_warning }>8 a 16 caracteres, incluindo pelo menos um símbolo, letra maiúscula e número</label>
                  
                </div>

                <label id='general_warning' ref={failedLoginRef} className={ style.general_warning }>Login ou senha incorretos</label>

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
