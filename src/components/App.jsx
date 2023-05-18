import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Empresa from './Empresa';
import Historico from './Historico';
import Cliente from './Cliente';
import AddReclamacao from './AddReclamacao';
import { Routes, Route } from 'react-router-dom';
import Login from '../layout/Login';
import Signup from '../layout/Signup';
import { Component } from 'react';
import style from '../layout/Login.module.css';
import loading from '../assets/images/loading.gif';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: [],
      empresa: '',
      mockLogin: [],
      logado: false,
      definicao: '',
      usuario: '',
      isDataLoaded: false,
    };
  }

  // Executa os métodos responsáveis por carregar os dados das empresa e login ao ser montado
  componentDidMount() {
    this.handleEmpresas();
    this.handleMockLogin();
  }

  // Busca e armazena os dados das empresas em um arquivo JSON via fetch
  handleEmpresas() {
    fetch('src/assets/data/data.json')
    .then(response => response.json())
    .then(data => this.setState({empresas: data, isDataLoaded: true}));
  }

  // Busca e armazena os dados de login em um arquivo JSON via fetch
  handleMockLogin() {
    fetch('src/assets/data/mockLogin.json')
    .then(response => response.json())
    .then(data => this.setState({mockLogin: data}));
  }

  // Abre/Fecha o menu em dispositivos móveis
  handleMobileMenu = () => {
    let menu = document.querySelector('#menu');
    if (menu.classList.contains('active'))
      menu.classList.remove('active');
    else
      menu.classList.add('active');
  };

  // Limpa as sugestões de busca
  limpaSugestoes = (listaSugestoes) => {
    while (listaSugestoes.firstChild) {
      listaSugestoes.removeChild(listaSugestoes.firstChild);
    }
  }

  // Realiza a pesquisa da sugestão clicada
  clicouSugestao = (e, listaSugestoes, input, id) => {
    this.limpaSugestoes(listaSugestoes);
    input.value = e.target.textContent;
    // Se a pesquisa foi realizada no input header, chama a funçao handleSearch, caso não, executa a função handleFind
    id === 'search' ? this.handleSearch() : this.handleFind();
  }

  // Permite a navegação pelas setas nas sugestões de pesquisa
  handleNavigateSuggestions = (e) => {
    const el = document.querySelectorAll('.sugested');
    if(el.length > 0 && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter')) {
      // converte objetos array-like, como NodeList ou HTMLCollection em um array padrão.
      let selected = Array.from(el).findIndex(item => item.classList.contains('selected'));
  
      selected !== -1 ? el[selected].classList.remove('selected') : null;
      
      if(e.key === 'ArrowDown') {
        selected === el.length -1 ? selected = -1 : null;
        selected += 1;
      } else if(e.key === 'ArrowUp') {
        selected === -1 ? selected = 0 : null;
        selected = (selected -1 + el.length) % el.length
      } else {
        if(e.target.id === 'search') {
          this.state.empresas.some(item => item.nome.toLowerCase().includes(e.target.value.toLowerCase())) ? (document.querySelector('#search').value = el[selected].textContent, this.handleSearch()) : null;
        } else {
          this.state.empresas.some(item => item.nome.toLowerCase().includes(e.target.value.toLowerCase())) ? (document.querySelector('#find').value = el[selected].textContent, this.handleFind()) : null;
        }
      }
      selected !== -1 ? el[selected].classList.add('selected') : null;
    }
  };

  // Exibe as sugestões de pesquisa de acordo com os caracteres digitados
  handleSuggestions = (e) => {
    const { empresas } = this.state;
    let input = e.target;
    let id = input.id;
    let digitado = e.target.value.toLowerCase();
    const listaSugestoes = e.target.parentNode.children[1];

    this.limpaSugestoes(listaSugestoes);

    if (!digitado)
      return null;

    for (let indice = 0; indice < empresas.length; indice++) {
      if (empresas[indice].nome.toLowerCase().includes(digitado)) {
        const sugestao = document.createElement('div');
        sugestao.classList.add('sugested');
        sugestao.textContent = empresas[indice].nome;
        listaSugestoes.appendChild(sugestao);
        sugestao.addEventListener('click', (e) => this.clicouSugestao(e, listaSugestoes, input, id));
      }
    }
    if(listaSugestoes.children.length > 0)
      listaSugestoes.children[0].classList.add('selected')
    else {
      const sugestao = document.createElement('div');
      sugestao.classList.add('sugested');
      sugestao.textContent = 'Empresa não econtrada';
      listaSugestoes.appendChild(sugestao);
    }
  };

  // Efetua a pesquisa do input localizado no header
  handleSearch = (e) => {
    let company = document.querySelector('#search').value.toLowerCase();
    const suggestions = document.querySelector('#suggestions');

    if(this.state.empresas.some(item => (item.nome.toLowerCase()) === company)) {
      this.setState({ empresa: company });
      e === undefined ? document.querySelector('#header_btn').click() : null;
      this.limpaSugestoes(suggestions);
      document.querySelector('#search').value = '';
    }
    else {
      e.preventDefault();
      document.querySelector('#search').focus();
    }
  }

  // Efetua a pesquisa do input localizado no main
  handleFind = (e) => {
    let company = document.querySelector('#find').value.toLowerCase();
    const suggestions = document.querySelector('#suggestions');

    if(this.state.empresas.some(item => (item.nome.toLowerCase()) === company)) {
      this.setState({ empresa: company });
      e === undefined ? document.querySelector('#find-btn').click() : null;
      this.limpaSugestoes(suggestions);
      document.querySelector('#find').value = '';
    }
    else {
      e.preventDefault();
      document.querySelector('#find').focus();
    }
  };

  // Verifica o login do usuário, caso seja válido, permite o login e adiciona os dados do login ao estado 'usuário'
  handleValidation = (e, login, password) => {
    const { mockLogin } = this.state;
    const valido = mockLogin.some(item => item.username === login && item.senha === password);
    const dados = mockLogin.find(item => item.username === login && item.senha === password);
    const warning = document.querySelector('#general_warning');
    
    if(valido) {
      this.setState({
        logado: true,
        usuario: dados,
        definicao: dados.definicao === 'consumidor' ? 'consumidor' : 'empresa'
      });
      warning.classList.remove(style.warning);
    } else {
      e.preventDefault();
      warning.classList.add(style.warning);
    }
  };

  // Desloga o usuário e reseta informações
  handleLogout = () => {
    this.setState({
      logado: false,
      usuario: '',
      definicao: ''
    });
  };

  // Apaga a reclamação selecionada pelo usuário
  handleDeleteClaim = (dado) => {
    this.state.empresas.map(item => {
      if(item.nome === dado.empresa) {
        item.reclamacoes.filter((reclamacao, index) => {
          if(reclamacao.id === dado.id)
            item.reclamacoes.splice(index, 1);
        });
      }
    });
  };

  // Adiciona a reclamação realizada pelo usuário
  handleClaim = (e) => {
    const { empresas } = this.state;

    const empresa = document.querySelector('#listCompany').value;
    const nome = document.querySelector('#claimName').value;
    const sobrenome = document.querySelector('#claimSurname').value;
    const username = document.querySelector('#claimUsername').value;
    const claim = document.querySelector('#claim').value;

    if(empresa !== 'opcao0' && nome.length && sobrenome.length && username.length && claim.length) {
      const date = new Date();
      empresas.map(item => {
        if(item.nome === empresa)
          item.reclamacoes.push(
            {
              nome: `${nome}`,
              sobrenome: `${sobrenome}`,
              username: `${username}`,
              reclamacao: `${claim}`,
              id: Math.floor((Math.random() * 100) + 100),
              status: 'Aberta',
              data: date,
              horario: date.toLocaleTimeString()
            }
          );
      })
      this.setState({ empresas: empresas });
    } else {
      e.preventDefault();
      alert('É necessário fazer Login para reclamar!');
    }
  };
  
  render() {
    const { empresas, empresa, logado, usuario, definicao, isDataLoaded, mockLogin } = this.state;

    if (!isDataLoaded) {
      return (
        <div className='grid-container'>
          <div className='loading_area'>
            <img src={loading} alt='Loading' className='loading' />
          </div>
        </div>
      )
    }

    return (
      <div className='grid-container'>
        <Header handleSuggestions={ this.handleSuggestions } handleMobileMenu= { this.handleMobileMenu } event={ this.handleSearch } logado={ logado } usuario={ usuario } logout={ this.handleLogout } definicao={ definicao } handleNavigateSuggestions={ this.handleNavigateSuggestions } />
        <Routes>
          <Route path='/' element={ <Content handleSuggestions={ this.handleSuggestions } event={ this.handleFind } empresas={ empresas } logado={ logado } definicao={ definicao }  handleNavigateSuggestions={ this.handleNavigateSuggestions } /> } />
          <Route path='/login' element={ <Login handleValidation={ this.handleValidation }  /> } />
          <Route path='/signup' element={ <Signup empresas={ empresas } mockLogin={ mockLogin } /> } />
          <Route path='/empresa' element={ <Empresa empresas={ empresas } usuario={ usuario } /> } />
          <Route path='/historico' element={ <Historico empresas={ empresas } empresa={ empresa } logado={ logado } /> } />
          <Route path='/cliente' element={ <Cliente cliente={ empresas } usuario={ usuario } event={ this.handleDeleteClaim } /> } />
          <Route path='/open' element={ <AddReclamacao empresas={ empresas } event={ this.handleClaim } usuario={ usuario } definicao={ definicao } /> } />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
