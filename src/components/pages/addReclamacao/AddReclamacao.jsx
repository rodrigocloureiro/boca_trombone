import Input from '../../common/Input';
import Modal from '../../common/Modal';
import { Link } from 'react-router-dom';
import style from './AddReclamacao.module.css';
import { Component, createRef } from 'react';

class AddReclamacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claim: '',
      company: ''
    };
    this.modalRef = createRef();
  }

  // Remove o aviso de empresa não selecionada
  handleCompany = () => {
    document.querySelector("#listCompany").classList.remove(`${style.warning}`);
  };

  // Remove o aviso de reclamação não digitada
  handleClaimValue = () => {
    document.querySelector("#claim").classList.remove(`${style.warning}`);
  };

  // Exibe o modal caso a área de reclamação esteja preenchida corretamente, caso não, exibe o erro em questão que não permite envio
  handleShowModal = (e) => {
    e.preventDefault();
    if(this.state.claim.length > 0 && this.state.company.length > 0) {
      this.modalRef.current.style.display = "block";
      
    } else {
      this.state.claim === '' ? document.querySelector("#claim").classList.add(`${style.warning}`) : null;
      this.state.company === '' ? document.querySelector("#listCompany").classList.add(`${style.warning}`) : null;
    }
  };

  render() {
    const { empresas, event, usuario, definicao } = this.props;

    return (
      <main>

        <Modal claim={ this.state.claim } company={ this.state.company } event={ event } modalRef={this.modalRef} />

        <div className={ style.container }>

          <section className={ style.reclamacao_section }>

            <h2>Abra sua reclamação</h2>

            <form className={ style.reclamacao_form }>
              
              <select defaultValue='opcao0' id='listCompany' className={ style.list_options } onChange={ (e) => {
                this.setState({ company: e.target.value });
                this.handleCompany();
              }}>
                
                <option disabled value='opcao0' className={ style.option }>Selecione a empresa</option>
                
                {
                  empresas.map(item => (
                    <option key={ item.id } className={ style.option }>{ item.nome }</option>
                  ))
                }
                    
              </select>
                
              <Input type='text' placeholder='Digite o seu nome' id='claimName' autoComplete='off' value={ usuario.nome } disabled={ false } />

              {
                definicao === 'empresa' ?

                <Input type='text' placeholder='Digite o seu CNPJ' id='variableClaim' autoComplete='off' value={ usuario.cnpj } disable={ true } />
                :
                <Input type='text' placeholder='Digite o seu sobrenome' id='variableClaim' autoComplete='off' value={ usuario.sobrenome } disable={ false } />
              }

              <Input type='text' placeholder='Digite o seu username com @' id='claimUsername' autoComplete='off' value={ usuario.username } disable={ true } />
    
              <textarea placeholder='Escreva aqui a sua reclamação' id='claim' className={ style.claim_ipt } autoComplete='off' onChange={ (e) => {
                this.setState({ claim: e.target.value });
                this.handleClaimValue();
              }} />

              <Link to='/' role='button' className={ style.claim_btn } onClick={ this.handleShowModal }>Enviar reclamação</Link>
              
            </form>
            
          </section>
          
        </div>
        
      </main>
    );
  }
}

export default AddReclamacao;
