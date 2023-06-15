import style from './Empresa.module.css';
import { Component, createRef } from 'react';
import Modal from '../../common/Modal';

class Empresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reclamacoes: [],
      logo: '',
      resp: false,
      reclamacaoSelecionada: [],
      answerValue: '',
    };
    this.modalRef = createRef();
  }

  // Busca as reclamações e logotipo referentes a empresa logada ao montar o componente
  componentDidMount() {
    const { empresas, usuario } = this.props;

    empresas.filter(item => {
      if(item.nome === usuario.nome) {
        this.setState({
          reclamacoes: item.reclamacoes,
          logo: item.imageURL
        });
      }
    });
  };

  // Altera o status do reclamação para 'Resolvida'
  handleStatus = (dado) => {
    dado.status = 'Resolvida';
  };

  // Caso a reclamação não estja resolvida, altera o estado resposta, permitindo que a empresa responda a reclamação
  handleResp = (dado) => {
    if(dado.status !== 'Resolvida')
      this.setState({ resp: true });
    this.setState({ reclamacaoSelecionada: dado });
  };

  // Adiciona a resposta da empresa à reclamação selecionada
  handleAnswer = (param, company) => {
    const { answerValue } = this.state;
    const { empresas } = this.props;
    const data = new Date();

    empresas.map(item => {
      if(item.nome === company.nome)
        item.reclamacoes.forEach(reclamacao => {
          if(reclamacao.id === param.id)
            reclamacao.resposta = {texto: answerValue, data: data};
        });
    });
  };

  // Exibe o modal caso os campos estejam preenchidos corretamente, caso não, exibe o erro em questão que não permite envio
  handleShowModal = (e) => {
    e.preventDefault();
    const { answerValue } = this.state;
    if(answerValue.length > 0) {
      this.modalRef.current.style.display = "block";
    } else {
      this.state.answerValue === '' && document.querySelector("#answer").classList.add(`${style.warning}`); // exibe o erro
    }
  };
  
  render() {
    const { usuario } = this.props;
    const { reclamacoes, logo, resp, reclamacaoSelecionada, confirm, answerValue } = this.state;

    return (
      <main>
        
        <Modal headerText='Você confirma os dados?' claim={ reclamacaoSelecionada } answer={ answerValue } event={ this.handleAnswer } usuario={ usuario } modalRef={this.modalRef} />

        {
          !resp ? (
          <div className={ style.container}>

            <section className={ style.company_section }>

              <div className={ style.company }>

                <img src={ logo } alt={ `Logo ${usuario.nome}` } />

                <h1>{ `${usuario.nome} - ${usuario.cnpj}` }</h1>

              </div>
              
              <h2>Reclamações:</h2>
              
              <ul className={ style.claims_list }>
                {
                  reclamacoes.map(dado => (
                    <li key={ dado.id } onClick={ () => this.handleResp(dado) }>
                      <p className={ style.claim }>{ dado.status === 'Aberta' ? (<>❗</>) : (<>✅</>) } { dado.reclamacao }</p>
                      <p>{ dado.username }</p>
                      <p>Status: { dado.status }</p>
                      <p>{new Date(dado.data).toLocaleDateString()}, {dado.horario.slice(0, 5)}H</p>
                      { dado.resposta !== undefined &&
                        <>
                          <p className={ style.company_answer }>Resposta da empresa:</p>
                          <p className={ style.answer }>{ dado.resposta.texto }</p>
                          <p className={ style.answer_dados }>{ dado.resposta.data.toLocaleDateString() } - { dado.resposta.data.toLocaleTimeString() }</p>
                        </>
                      }
                      {
                        dado.status !== 'Resolvida' &&
                        <div key={ `btn${ dado.id }` }>
                          <button className={ style.close_claim } onClick={ () => this.handleStatus(dado) }>Fechar reclamação</button>
                          <button className={ style.answer_claim } onClick={ () => this.handleResp(dado) }>Responder reclamação</button>
                        </div>
                      }
                    </li>
                  ))
                }
              </ul>
              
            </section>
            
          </div>
          ) : (
            <div className={ style.container}>
              
              <section className={ style.answer_section }>

                <h2>Usuário: { reclamacaoSelecionada.username }</h2>

                <h2>Reclamação:</h2>

                <p className={ style.claim }>{ reclamacaoSelecionada.reclamacao }</p>

                <form className={ style.answer_form }>
                  
                  <label>Digite aqui sua resposta:</label>

                  <textarea className={ style.answer_ipt } id='answer' placeholder='Resposta...' onChange={(e) => {
                    e.target.value.length > 0 ? e.target.classList.remove(`${style.warning}`) : e.target.classList.add(`${style.warning}`);
                    this.setState({ answerValue: e.target.value });
                  }} />

                  <div className={ style.answer_btns_area }>

                    <button className={ style.answer_btn } onClick={ this.handleShowModal }>Enviar resposta</button>

                  </div>

                </form>

              </section>

            </div>
          )
        }
        
      </main>
    );
  }
}

export default Empresa;
