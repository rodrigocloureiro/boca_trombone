import buscarImg from '../../src/assets/search.svg';
import Input from './Input';
import { Link } from 'react-router-dom';
import { Component } from 'react';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: props.empresas
    };
  }

  componentDidMount() {
    const { ranking } = this.state;
    const { empresas } = this.props;

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

  componentWillUnmount() {
    const { handleNavigateSuggestions } = this.props;
    document.querySelector('#find').removeEventListener('keydown', handleNavigateSuggestions);
  }

  render() {
    const { ranking } = this.state;
    const { handleSuggestions, event, logado, definicao, handleSelectedCompany, handleNavigateSuggestions } = this.props;

    return (
      <main>

        <div className='container'>

          <section className='find-area'>

            <div className='title-area'>

              <h1>Encontre a empresa e faça sua reclamação</h1>

            </div>

            <div className='find'>

              <Input type='text' placeholder='Digite o nome da empresa' id='find' className='find_input' event={handleSuggestions} autoComplete='off' handleNavigateSuggestions={ handleNavigateSuggestions } />

              <div className='suggestions'></div>

              <Link to='/historico' role="button" className='find-button' id="find-btn" onClick={event}>Buscar</Link>

              <Link to='/historico' role="button" className='find-image' id="find-mobile-btn" onClick={event}>
                <img src={buscarImg} alt="Buscar" />
              </Link>

            </div>

          </section>

          <section className='rankings-area'>
            <div>
              <p className='ranking-title'>Melhores empresas</p>
              <ul className='rank_best_percent'>
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
              <p className='ranking-title'>Mais reclamadas</p>
              <ul className='rank_best_percent'>
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

          <section className='utilities-area'>
            {
              definicao !== 'empresa' &&

              <div className='client'>
  
                <h3>Consumidor</h3>
  
                <Link to={ logado ? '/cliente' : '/login'} className='client_btn' title='Área do consumidor'>Área do Consumidor</Link>
  
              </div>

            }

            {
              definicao !== 'consumidor' &&
              
              <div className='company'>

                <h3>Empresa</h3>

                <Link to={ logado ? '/empresa' : '/login'} role='button' className='company_btn' title='Área da Empresa'>Área da Empresa</Link>

              </div>
            
            }

            <div className='help'>

              <h3>Ajuda</h3>

              <Link to={ logado ? '/open' : '/login'} className='help_btn' title='Reclame aqui de uma empresa' onClick={ handleSelectedCompany }>Reclamação de uma empresa</Link>

            </div>

          </section>

        </div>

      </main>
    );
  }
}

export default Content;
