import style from './Signup.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Signup({ event, handleNome, handleEmail, handleSobrenome, handleCNPJ, handleLoginSign, handlePassSign }) {
  const [ typeAccount, setTypeAccount ] = useState('');
  
  return (
    <main>

      <section className={ style.signup_section }>
        
        <div className={ style.container }>
      
          <div className={ style.form_modal }>
      
            <h2>Cadastre-se</h2>
      
            <form>

              <div>

                <label>Tipo de conta:</label>

                <input type='radio' className={ style.choice } id='consumidor' name='type_account' value='consumidor' onInput={ (e) => setTypeAccount(e.target.value) } />
                <label htmlFor='consumidor' className={ style.choice }>Consumidor</label>

                <input type='radio' className={ style.choice } id='empresa' name='type_account' value='empresa' onInput={ (e) => setTypeAccount(e.target.value) } />
                <label htmlFor='empresa' className={ style.choice }>Empresa</label>
                
              </div>
      
              <div>
      
                <label htmlFor="nome">Nome</label>
                <div className={ style.ipt_nome }>
                  <i className="bi bi-person-vcard"></i>
                  <input type="text" name="nome" id="nome" placeholder="Digite seu nome" required minLength="2" pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$" onChange={ handleNome } />
                </div>
                
              </div>

              <label id='nome__sign_warning' className='nome__sign_warning'>Apenas letras maiúsculas e minúsculas</label>

              {
                typeAccount === 'consumidor' && (
                  <div>
        
                    <label htmlFor="info">Sobrenome</label>
                    <div className={ style.ipt_nome }>
                      <i className="bi bi-person-vcard"></i>
                      <input type="text" name="info" id="info" placeholder="Digite seu sobrenome" required minLength="2" pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$" onChange={ handleSobrenome } />
                    </div>
                  
                  </div>
                )
              }
              <label id='sobrenome__sign_warning' className='sobrenome__sign_warning'>Apenas letras maiúsculas e minúsculas</label>
              {
                typeAccount === 'empresa' && (
                  <div>
        
                    <label htmlFor="info">CNPJ</label>
                    <div className={ style.ipt_nome }>
                      <i className="bi bi-123"></i>
                      <input type="text" name="info" id="info" placeholder="Digite seu CNPJ" required minLength="2" pattern="^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})\-(\d{2})$" onChange={ handleCNPJ } />
                    </div>
                  
                  </div>
                )
              }
              <label id='cnpj__sign_warning' className='cnpj__sign_warning'>O CNPJ deve seguir o formato 00.000.000/0000-00</label>
              
              <div>
      
                <label htmlFor="email">E-mail</label>
                <div className={ style.ipt_email }>
                  <i className="bi bi-envelope"></i>
                  <input type="email" name="email" id="email" placeholder="Digite seu e-mail" required pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" onChange={ handleEmail } />
                </div>    
                
              </div>

              <label id='email__sign_warning' className='email__sign_warning'>Formato de e-mail inválido</label>
      
              <div>
      
                <label htmlFor="login">Login</label>
                <div className={ style.ipt_login }>
                  <i className="bi bi-person"></i>
                  <input type="text" name="login" id="login-signup" placeholder="Digite seu username" minLength="3" maxLength="15" required pattern="^(?=.*[A-Za-z0-9]$)([@])[A-Za-z\d.-]{2,15}$" onChange={ handleLoginSign } />
                </div>
      
              </div>

              <label id='login__sign_warning' className='login__sign_warning'>3 a 15 caracteres. Deve começar com @</label>
      
              <div>
      
                <label htmlFor="senha">Senha</label>
                <div className={ style.ipt_pass }>
                  <i className="bi bi-shield-lock"></i>
                  <input type="password" name="senha" id="senha-signup" placeholder="Digite sua senha" minLength="8" maxLength="16" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" onChange={ handlePassSign } />
                </div>
      
              </div>

              <label id='pass__sign_warning' className='pass__sign_warning'>8 a 16 caracteres, incluindo pelo menos um símbolo, letra maiúscula e número</label>
      
              <div className={ style.btn_login }>
      
                <Link to='/' className={ style.button } onClick={ event }>Cadastrar</Link>
      
              </div>
      
              <div className={ style.login }>
      
                <p>Já sou cadastrado!</p>
                <Link to="/login" title="Login">Me tire daqui!</Link>
                
              </div>
      
            </form>
      
          </div>
      
        </div>
      
      </section>
      
    </main>
  );
}

export default Signup;            
