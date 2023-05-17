import style from './Signup.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Signup({ empresas, mockLogin }) {
  const [ typeAccount, setTypeAccount ] = useState('');
  const [ nome, setNome ] = useState('');
  const [ sobrenome, setSobrenome ] = useState('');
  const [ cnpj, setCnpj ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');

  // Válida as informações dos inputs
  const handleInputValidation = (e, regex) => {
    const value = e.target.value
    const pattern = new RegExp(regex);
    const warning = e.target.parentNode.parentNode.nextElementSibling; // próximo irmão do pai do pai do e.target
    if(value === ''|| !pattern.test(value)) {
      e.target.classList.add(style.error);
      warning.classList.add('warning');
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove('warning');
    }
  };

  // Cria o usuário ou empresa preenchido no formulário e adiciona à mockLogin e caso empresa, também à empresas
  const handleCreateUser = (e) => {
    if(!typeAccount) {
      e.preventDefault();
      alert('Escolha o tipo de conta!');
    } else {
      const name = document.querySelector('#nome');
      const emailDOM = document.querySelector('#email');
      const username = document.querySelector('#login-signup');
      const passwordDOM = document.querySelector('#senha-signup');
      const auxDOM = typeAccount === 'consumidor' ? document.querySelector('#sobrenome') : document.querySelector('#cnpj'); // Captura o elemento no DOM de acordo com a variáve typeAccount
      const check = [ name, emailDOM, username, passwordDOM, auxDOM ].some(item => item.classList.contains('_error_1vpv1_105'));
      if(nome.length && email.length && login.length && password.length && (sobrenome.length || cnpj.length) && !check) {
        const newUser = {
          nome: nome,
          username: login,
          email: email,
          id: Math.floor((Math.random() * 1000) + 1000),
          senha: password,
          avatar: 'https://picsum.photos/200',
          definicao: typeAccount
        };
        if(typeAccount === 'consumidor') {
          newUser.sobrenome = sobrenome;
        } else {
          newUser.cnpj = cnpj;
          empresas.push({
            nome: newUser.nome,
            id: newUser.id,
            cnpj: newUser.cnpj,
            imageURL: newUser.avatar,
            reclamacoes: []
          });
        }
        mockLogin.push(newUser);
      } else {
        e.preventDefault();
        alert('Preencha todos os campos corretamente!');
      }
    }
  }
  
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
                  <input type="text" name="nome" id="nome" value={nome} placeholder="Digite seu nome" required minLength="2" onChange={ (e) => {setNome(e.target.value); handleInputValidation(e, /^[a-zA-Z]+([',. -][a-zA-Z ])?[a-zA-Z]*$/)} } />
                </div>
                
              </div>

              <label id='nome__sign_warning' className='nome__sign_warning'>Apenas letras maiúsculas e minúsculas</label>

              {
                typeAccount === 'consumidor' && (
                  <div>
        
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <div className={ style.ipt_nome }>
                      <i className="bi bi-person-vcard"></i>
                      <input type="text" name="sobrenome" id="sobrenome" value={sobrenome} placeholder="Digite seu sobrenome" required minLength="2" onChange={ (e) => {setSobrenome(e.target.value); handleInputValidation(e, /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)} } />
                    </div>
                  
                  </div>
                )
              }
              <label id='sobrenome__sign_warning' className='sobrenome__sign_warning'>Apenas letras maiúsculas e minúsculas</label>
              {
                typeAccount === 'empresa' && (
                  <div>
        
                    <label htmlFor="cnpj">CNPJ</label>
                    <div className={ style.ipt_nome }>
                      <i className="bi bi-123"></i>
                      <input type="text" name="cnpj" id="cnpj" value={cnpj} placeholder="Digite seu CNPJ" required minLength="2" onChange={ (e) => {setCnpj(e.target.value); handleInputValidation(e, /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)} } />
                    </div>
                  
                  </div>
                )
              }
              <label id='cnpj__sign_warning' className='cnpj__sign_warning'>O CNPJ deve seguir o formato 00.000.000/0000-00</label>
              
              <div>
      
                <label htmlFor="email">E-mail</label>
                <div className={ style.ipt_email }>
                  <i className="bi bi-envelope"></i>
                  <input type="email" name="email" id="email" value={email} placeholder="Digite seu e-mail" required onChange={ (e) => {setEmail(e.target.value); handleInputValidation(e, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)} } />
                </div>    
                
              </div>

              <label id='email__sign_warning' className='email__sign_warning'>Formato de e-mail inválido</label>
      
              <div>
      
                <label htmlFor="login">Login</label>
                <div className={ style.ipt_login }>
                  <i className="bi bi-person"></i>
                  <input type="text" name="login" id="login-signup" value={login} placeholder="Digite seu username" minLength="3" maxLength="15" required onChange={ (e) => {setLogin(e.target.value); handleInputValidation(e, /^(?=.*[A-Za-z0-9]$)([@])[A-Za-z\d.-]{2,15}$/)} } />
                </div>
      
              </div>

              <label id='login__sign_warning' className='login__sign_warning'>3 a 15 caracteres. Deve começar com @</label>
      
              <div>
      
                <label htmlFor="senha">Senha</label>
                <div className={ style.ipt_pass }>
                  <i className="bi bi-shield-lock"></i>
                  <input type="password" name="senha" id="senha-signup" value={password} placeholder="Digite sua senha" minLength="8" maxLength="16" required onChange={ (e) => {setPassword(e.target.value); handleInputValidation(e, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)} } />
                </div>
      
              </div>

              <label id='pass__sign_warning' className='pass__sign_warning'>8 a 16 caracteres, incluindo pelo menos um símbolo, letra maiúscula e número</label>
      
              <div className={ style.btn_login }>
      
                <Link to='/' className={ style.button } onClick={ handleCreateUser }>Cadastrar</Link>
      
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
