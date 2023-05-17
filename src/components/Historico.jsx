import style from './Historico.module.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import bom from '../assets/images/bom.png';
import otimo from '../assets/images/otimo.png';
import ruim from '../assets/images/ruim.png';
import naorecomendada from '../assets/images/nao_recomendada.png';

class Historico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      reclamacoes: [],
      logo: '',
      resolvidas: [],
      percResolvidas: 0,
      abertas: [],
      percAbertas: 0,
      cnpj: '',
    };
  }

  // Carrega informações da empresa selecionada ao ser montado
  componentDidMount() {
    const { empresas, empresa } = this.props;

    empresas.filter(item => {
      if(item.nome.toLowerCase() === empresa) {
        this.setState({
          nome: item.nome,
          reclamacoes: item.reclamacoes,
          logo: item.imageURL,
          resolvidas: item.reclamacoes.filter(item => item.status === 'Resolvida'),
          percResolvidas: item.reclamacoes.filter(item => item.status === 'Resolvida').length / item.reclamacoes.length * 100,
          abertas: item.reclamacoes.filter(item => item.status === 'Aberta'),
          percAbertas: item.reclamacoes.filter(item => item.status === 'Aberta').length / item.reclamacoes.length * 100,
          cnpj: item.cnpj,
        });
      }
    });
  };

  // Carrega as informações da empresa selecionada ao ser atualizado
  componentDidUpdate(prevProps) {
    const { empresas, empresa } = this.props;
    
    if (prevProps.empresa !== empresa) {
      empresas.filter(item => {
        if(item.nome.toLowerCase() === empresa) {
          this.setState({
            nome: item.nome,
            reclamacoes: item.reclamacoes,
            logo: item.imageURL,
            resolvidas: item.reclamacoes.filter(item => item.status === 'Resolvida'),
            percResolvidas: item.reclamacoes.filter(item => item.status === 'Resolvida').length / item.reclamacoes.length * 100,
            abertas: item.reclamacoes.filter(item => item.status === 'Aberta'),
            percAbertas: item.reclamacoes.filter(item => item.status === 'Aberta').length / item.reclamacoes.length * 100,
            cnpj: item.cnpj,
          });
        }
      });
    }
  };
  
  render() {
    const { nome, reclamacoes, logo, resolvidas, percResolvidas, abertas, percAbertas, cnpj } = this.state;
    const { logado } = this.props;
    // Define a imagem que será exibida no perfil da empresa de acordo com o percentual de reclamações resolvidas
    const status = percResolvidas > 90 ? otimo : percResolvidas <= 90 && percResolvidas > 60 ? bom : percResolvidas >= 50 && percResolvidas <= 60 ? ruim : percResolvidas < 50 && reclamacoes.length > 0 ? naorecomendada : otimo;

    return (
      <main>

        <div className={`${style.container} ${style.historic }`}>

          <div className={ style.info_area }>

            <article className={ style.company_info }>
  
              <div className={ style.company_info__top }>
  
                <img src={ status } alt='Imagem Status'></img>

                {
                  reclamacoes.length === 0 ?
                  <p><span>0%</span> / 100%</p> : <p><span>{ percResolvidas.toFixed(1) }%</span> / 100%</p>
                }
                
              </div>
  
              <div className={ style.company_info__content }>
  
                <p>Reclamações</p>
  
                <p>{ reclamacoes.length }</p>
              
              </div>
  
              <div className={ style.company_info__content }>
  
                <p>Reclamações respondidas</p>
  
                <p>{ resolvidas.length }</p>
              
              </div>
  
              <div>
  
                <p>Índice de respondidas</p>
  
                <div className={ style.company_info__content }>
  
                  <div className={ style.company_info__range }>
  
                    <div className={ style.bar } style={{ width: `${percResolvidas}%` }} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={ percResolvidas }></div>
                  
                  </div>

                  {
                    reclamacoes.length > 0 ?
                    <p>{ percResolvidas.toFixed(1) }%</p> : <p>0%</p>
                  }
                  
                </div>
                
              </div>
  
              <div className={ style.company_info__content }>
  
                <p>Reclamações abertas</p>
  
                <p>{ abertas.length }</p>
                
              </div>
  
              <div>
  
                <p>Índice de abertas</p>
  
                <div className={ style.company_info__content }>
  
                  <div className={ style.company_info__range }>
  
                    <div className={ style.bar } style={{ width: `${percAbertas.toFixed(1)}%` }} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={ percAbertas }></div>
                  
                  </div>

                  {
                    reclamacoes.length > 0 ?
                    <p>{ percAbertas.toFixed(1) }%</p> : <p>0%</p>
                  }
                  
                </div>
                
              </div>
              
            </article>
  
            <article className={ style.help_area }>
  
              <div className='help'>
  
                <Link to={ logado ? '/open' : '/login'} className={ style.help_btn } title='Reclame aqui de uma empresa'>Abrir reclamação</Link>
  
              </div>
              
            </article>

          </div>

          <section className={ style.historic_company_section }>
            
            <div className={ style.historic_company }>
              
              <img src={ logo } alt={ `${nome} logo` } />
              
              <h1>{ `${nome} - ${cnpj}` }</h1>
              
            </div>

            {
              reclamacoes.length > 0 ? (
              <>
                <h2>Reclamações:</h2>
              
                <ul className={ style.claims_list }>
                  {
                    reclamacoes.map(dado => (
                      <li key={ dado.id }>
                        <p className={ style.claim }>{ dado.status === 'Aberta' ? (<>❗</>) : (<>✅</>) } { dado.reclamacao }</p>
                        <p>{ dado.username }</p>
                        <p>Status: { dado.status }</p>
                        <p>{new Date(dado.data).toLocaleDateString()}, {dado.horario.slice(0, 5)}H</p>
                      </li>
                    ))
                  }
                </ul>
  
                <h2>Reclamações Resolvidas (%):</h2>
            
                <p>{ Math.floor((resolvidas.length / reclamacoes.length) * 100) }%</p>
              </> ) : (
                <h2>Não há reclamações</h2>
              )
            }
            
          </section>
            
        </div>
        
      </main>
    );
  }
}

export default Historico;
