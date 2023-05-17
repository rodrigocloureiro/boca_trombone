import style from './Login.module.css';
import { Link } from 'react-router-dom';

function Login({ event, handleLogin, handlePassword }) {
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
                    
                    <input type="text" name="login" id="login" placeholder="Digite seu username com @" minLength="3" maxLength="15" required pattern="^(?=.*[A-Za-z0-9]$)([@])[A-Za-z\d.-]{2,15}$" onChange={ handleLogin } />

                  </div>

                  <label id='login_warning' className={ style.login_warning }>3 a 15 caracteres. Deve começar com @</label>
                  
                </div>

                <div>

                  <label htmlFor="senha">Senha</label>
                  
                  <div className={ style.ipt_pass }>
                    
                    <i className="bi bi-shield-lock"></i>
                    
                    <input type="password" name="senha" id="senha" placeholder="Digite sua senha" minLength="8" maxLength="16" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" onChange={ handlePassword } />
                    
                  </div>

                  <label id='pass_warning' className={ style.pass_warning }>8 a 16 caracteres, incluindo pelo menos um símbolo, letra maiúscula e número</label>
                  
                </div>

                <label id='general_warning' className={ style.general_warning }>Login ou senha incorretos</label>

                <div className={ style.btn_login }>

                  {/* <button type="submit" onClick={ event }>Login</button> */}
                  
                  <Link to='/' onClick={ event }>Login</Link>
                
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
