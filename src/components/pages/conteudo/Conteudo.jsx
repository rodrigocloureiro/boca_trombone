import buscarImg from '../../../assets/images/search.svg';
import Input from '../../common/Input';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import style from './Conteudo.module.css';

class Conteudo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: props.empresas
    };
  }

  // Calcula o percentual das reclamações resolvidas e adiciona como proprieade no estado ranking assim que montado
  componentDidMount() {
    const { ranking } = this.state;

    ranking.map(item => {
      let percentual = 0;
      let resolvidas = 0;
      item.reclamacoes.map(reclamacao => {
        if (reclamacao.status === 'Resolvida')
          resolvidas += 1;
        percentual = Math.floor((resolvidas / item.reclamacoes.length) * 100);
      });
      item.percentual = percentual;
      item.nReclamacoes = item.reclamacoes.length;
    });
    this.setState({ ranking: ranking });
  }

  // Remove o evento keydown quando o componente é desmontado
  componentWillUnmount() {
    const { handleNavigateSuggestions } = this.props;
    document.querySelector('#find').removeEventListener('keydown', handleNavigateSuggestions);
  }

  render() {
    const { ranking } = this.state;
    const { handleSuggestions, event, logado, definicao, handleNavigateSuggestions } = this.props;

    return (
      <main>

        <div className='container'>

          <section className={style.find_area}>

            <div className={style.title_area}>

              <h1>Encontre a empresa e faça sua reclamação</h1>

            </div>

            <div className={style.find}>

              <Input type='text' placeholder='Digite o nome da empresa' id='find' className={style.find_input} event={handleSuggestions} autoComplete='off' handleNavigateSuggestions={ handleNavigateSuggestions } />

              <div className={style.suggestions} id='suggestions'></div>

              <Link to='/historico' role="button" className={style.find_button} id="find-btn" onClick={event}>Buscar</Link>

              <Link to='/historico' role="button" className={style.find_image} id="find-mobile-btn" onClick={event}>
                <img src={buscarImg} alt="Buscar" />
              </Link>

            </div>

          </section>

          <section className={style.rankings_area}>
            <div>
              <p className={style.ranking_title}>Melhores empresas</p>
              <ul className={style.rank_best_percent}>
                {
                  ranking.sort((a, b) => b.percentual - a.percentual)
                  .slice(0, 8)
                  .map(item => (
                    <li key={item.id}>
                      <img src={item.imageURL} alt={item.nome} style={{width: 35}}/>
                      <p>{item.nome} - {item.percentual}%</p>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div>
              <p className={style.ranking_title}>Mais reclamadas</p>
              <ul className={style.rank_best_percent}>
                {
                  ranking.sort((a, b) => b.nReclamacoes - a.nReclamacoes)
                  .slice(0, 8)
                  .map(item => (
                    <li key={item.id}>
                      <img src={item.imageURL} alt={item.nome} style={{width: 35}}/>
                      <p>{item.nome} - {item.nReclamacoes}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          </section>

          <section className={style.utilities_area}>
            {
              definicao !== 'empresa' &&

              <div className={style.client}>
  
                <h3>Consumidor</h3>
  
                <Link to={ logado ? '/cliente' : '/login'} className={style.client_btn} title='Área do consumidor'>Área do Consumidor</Link>
  
              </div>

            }

            {
              definicao !== 'consumidor' &&
              
              <div className={style.company}>

                <h3>Empresa</h3>

                <Link to={ logado ? '/empresa' : '/login'} role='button' className={style.company_btn} title='Área da Empresa'>Área da Empresa</Link>

              </div>
            
            }

            <div className={style.help}>

              <h3>Ajuda</h3>

              <Link to={ logado ? '/open' : '/login'} className={style.help_btn} title='Reclame aqui de uma empresa' >Reclamação de uma empresa</Link>

            </div>

          </section>

        </div>

      </main>
    );
  }
}

export default Conteudo;
