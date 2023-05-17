import { Link } from 'react-router-dom';
import style from './Empresa.module.css';
import { Component } from 'react';

class Empresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reclamacoes: [],
      logo: '',
      resp: false,
      reclamacaoSelecionada: [],
      confirm: false,
      answerValue: ''
    };
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

  // Caso a resposta seja preenchida corretamente, exibe o modal para confirmação, caso não, adiciona o erro em questão
  handleSubmitAnswer = (e) => {
    e.preventDefault();
    const answerValue = document.querySelector('#answer').value;
    if(answerValue.length > 0) {
      document.querySelector("#myModal").style.display = "block";
    } else {
      document.querySelector('#answer').classList.add(`${style.warning}`);
    }
  };

  // Adiciona a resposta da empresa à reclamação selecionada
  handleAnswer = (param, company) => {
    const { empresas } = this.props;
    const data = new Date();

    const compAnswer = document.querySelector('#answer').value;
    empresas.map(item => {
      if(item.nome === company.nome)
        item.reclamacoes.forEach(reclamacao => {
          if(reclamacao.id === param.id)
            reclamacao.resposta = {texto: compAnswer, data: data};
        });
    });
  };
  
  render() {
    const { usuario } = this.props;
    const { reclamacoes, logo, resp, reclamacaoSelecionada, confirm, answerValue } = this.state;

    return (
      <main>
        <div id="myModal" className={ style.modal }>
          <div className={ style.modal_content }>
            <div className={ style.modal_header }>
              {confirm ? (
                <>
                  <h2>Resposta enviada!</h2>
                  <Link to='/' role='button' className={ style.modal_button } onClick={ () => this.handleAnswer(this.state.reclamacaoSelecionada, this.props.usuario) }>Voltar para o início</Link>
                </>
               ) : (<h2>Você confirma os dados?</h2>)
              }
            </div>
            {!confirm &&
              <>
                <div className={ style.modal_body }>
                  <p>Reclamação: { reclamacaoSelecionada.reclamacao }</p>

                  <p>
                    Resposta: { answerValue }
                  </p>
                </div>
                <div className={ style.modal_footer }>
                  <button className={ style.modal_button } onClick={ () => this.setState({confirm: true}) }>Confirmar e Enviar</button>
                  <button className={ `${style.modal_button} ${style.modal_button__edit}` } onClick={ () => document.querySelector("#myModal").style.display = "none" }>Voltar e Editar</button>
                </div>
              </>
            }
          </div>
        </div>

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
                        <button key={ `btn${ dado.id }` } className={ style.close_claim } onClick={ () => this.handleStatus(dado) }>Fechar reclamação</button>
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

                    <button className={ style.answer_btn } onClick={ this.handleSubmitAnswer }>Enviar resposta</button>

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
