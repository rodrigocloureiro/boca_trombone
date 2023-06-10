import style from './Signup.module.css';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import Input from '../../common/Input';

function Signup({ empresas, mockLogin }) {
  const [ typeAccount, setTypeAccount ] = useState('');
  const inputNomeRef = useRef();
  const inputSobrenomeRef = useRef();
  const inputCnpjRef = useRef();
  const inputEmailRef = useRef();
  const inputLoginRef = useRef();
  const inputPasswordRef = useRef();

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
    // Cancela a ação caso o tipo de conta não seja escolhido
    if(!typeAccount) {
      e.preventDefault();
      alert('Escolha o tipo de conta!');
    } else {
      const auxDOM = typeAccount === 'consumidor' ? inputSobrenomeRef.current : inputCnpjRef.current; // Captura o elemento no DOM de acordo com a variáve typeAccount
      const refs = [ inputNomeRef.current, inputEmailRef.current, inputLoginRef.current, inputPasswordRef.current, auxDOM ];
      if(refs.every(item => item.value.length) && !refs.some(item => item.classList.contains(`${style.error}`))) {
        // ever verifica se TODOS os elementos atendem a condição, enquanto some verifica se pelo menos UM elemento atende
        const newUser = {
          nome: inputNomeRef.current.value,
          username: inputLoginRef.current.value,
          email: inputEmailRef.current.value,
          id: Math.floor((Math.random() * 1000) + 1000),
          senha: inputPasswordRef.current.value,
          avatar: 'https://picsum.photos/200',
          definicao: typeAccount
        };
        if(typeAccount === 'consumidor') { // Caso o tipo de conta seja consumidor, adiciona a propriedade sobrenome ao usuario
          newUser.sobrenome = inputSobrenomeRef.current.value;
        } else { // Caso o tipo de conta seja empresa, adiciona a propriedade cnpj ao usuario e adiciona o mesmo na lista de empresas
          newUser.cnpj = inputCnpjRef.current.value;
          empresas.push({
            nome: newUser.nome,
            id: newUser.id,
            cnpj: newUser.cnpj,
            imageURL: newUser.avatar,
            reclamacoes: []
          });
        }
        mockLogin.push(newUser); // adiciona o usuário a lista de login
      } else { // Cancela a ação caso algum campo acuse erro
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

                <Input
                  type='radio'
                  className={ style.choice }
                  id='consumidor'
                  name='type_account'
                  value='consumidor'
                  event={ (e) => setTypeAccount(e.target.value) }
                />
                <label htmlFor='consumidor' className={ style.choice }>Consumidor</label>

                <Input type='radio'
                  className={ style.choice }
                  id='empresa'
                  name='type_account'
                  value='empresa'
                  event={ (e) => setTypeAccount(e.target.value) }
                />
                <label htmlFor='empresa' className={ style.choice }>Empresa</label>
                
              </div>
      
              <div>
      
                <label htmlFor="nome">Nome</label>
                <div className={ style.ipt_nome }>
                    <i className="bi bi-person-vcard"></i>
                    <Input
                      type="text"
                      name="nome"
                      id="nome"
                      inputRef={inputNomeRef}
                      placeholder="Digite seu nome"
                      required={true}
                      minLength="2"
                      event={ (e) => handleInputValidation(e, /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) }
                    />
                </div>
                
              </div>

              <label id='nome__sign_warning' className={style.nome__sign_warning}>Apenas letras maiúsculas e minúsculas</label>

              {
                typeAccount === 'consumidor' && (
                  <div>
        
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <div className={ style.ipt_nome }>
                      <i className="bi bi-person-vcard"></i>
                      <Input
                        type="text"
                        name="sobrenome"
                        id="sobrenome"
                        inputRef={inputSobrenomeRef}
                        placeholder="Digite seu sobrenome"
                        required={true}
                        minLength="2"
                        event={ (e) => handleInputValidation(e, /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)}
                      />
                    </div>
                  
                  </div>
                )
              }
              <label id='sobrenome__sign_warning' className={style.sobrenome__sign_warning}>Apenas letras maiúsculas e minúsculas</label>
              {
                typeAccount === 'empresa' && (
                  <div>
        
                    <label htmlFor="cnpj">CNPJ</label>
                    <div className={ style.ipt_nome }>
                      <i className="bi bi-123"></i>
                      <Input
                        type="text"
                        name="cnpj"
                        id="cnpj"
                        inputRef={inputCnpjRef}
                        placeholder="Digite seu CNPJ"
                        required={true}
                        minLength="2"
                        event={ (e) => handleInputValidation(e, /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/) }
                      />
                    </div>
                  
                  </div>
                )
              }
              <label id='cnpj__sign_warning' className={style.cnpj__sign_warning}>O CNPJ deve seguir o formato 00.000.000/0000-00</label>
              
              <div>
      
                <label htmlFor="email">E-mail</label>
                <div className={ style.ipt_email }>
                  <i className="bi bi-envelope"></i>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    inputRef={inputEmailRef}
                    placeholder="Digite seu e-mail"
                    required
                    event={ (e) => handleInputValidation(e, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) }
                  />
                </div>    
                
              </div>

              <label id='email__sign_warning' className={style.email__sign_warning}>Formato de e-mail inválido</label>
      
              <div>
      
                <label htmlFor="login">Login</label>
                <div className={ style.ipt_login }>
                  <i className="bi bi-person"></i>
                  <Input
                    type="text"
                    name="login"
                    id="login-signup"
                    inputRef={inputLoginRef}
                    placeholder="Digite seu username"
                    minLength="3"
                    maxLength="15"
                    required={true}
                    event={ (e) => handleInputValidation(e, /^(?=.*[A-Za-z0-9]$)([@])[A-Za-z\d.-]{2,15}$/) }
                  />
                </div>
      
              </div>

              <label id='login__sign_warning' className={style.login__sign_warning}>3 a 15 caracteres. Deve começar com @</label>
      
              <div>
      
                <label htmlFor="senha">Senha</label>
                <div className={ style.ipt_pass }>
                  <i className="bi bi-shield-lock"></i>
                  <Input
                    type="password"
                    name="senha"
                    id="senha-signup"
                    inputRef={inputPasswordRef}
                    placeholder="Digite sua senha"
                    minLength="8"
                    maxLength="16"
                    required={true}
                    event={ (e) => handleInputValidation(e, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) }
                  />
                </div>
      
              </div>

              <label id='pass__sign_warning' className={style.pass__sign_warning}>8 a 16 caracteres, incluindo pelo menos um símbolo (@, $, !, %, *, ?, &), letra maiúscula e número</label>
      
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
