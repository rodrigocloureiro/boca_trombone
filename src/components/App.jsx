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
import loading from '../assets/loading.gif';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: [
        {
          nome: 'Vivo',
          id: 1,
          cnpj: '02.449.992/0056-38',
          reclamacoes: [
            {
              nome: 'João',
              sobrenome: 'Silva',
              username: '@joaosilva',
              reclamacao: 'Contratei um plano de internet da Vivo que prometia uma velocidade de navegação rápida e ilimitada. No entanto, após algumas semanas de uso, percebi que a velocidade era muito abaixo do que havia sido prometido e a conexão caía frequentemente, deixando-me sem acesso à internet. Tentei entrar em contato com a Vivo diversas vezes para solucionar o problema, mas o atendimento ao cliente foi muito ineficiente e pouco prestativo.',
              id: 1,
              status: 'Aberta',
              data: '2023/04/02', // AAAA/MM/DD
              horario: '16:30:00'
            },
            {
              nome: 'Maria',
              sobrenome: 'Souza',
              username: '@mariasouza',
              reclamacao: 'Comprei um aparelho celular da Vivo e, após alguns dias de uso, o dispositivo começou a apresentar problemas de lentidão, travamentos e desligamentos frequentes. Tentei entrar em contato com a empresa para solucionar o problema, mas o atendimento ao cliente foi muito burocrático e pouco eficiente, demorando semanas para uma resposta.',
              id: 2,
              status: 'Aberta',
              data: '2023/02/03', // AAAA/MM/DD
              horario: '15:30:00'
            },
            {
              nome: 'Pedro',
              sobrenome: 'Gomes',
              username: '@pedrogomes',
              reclamacao: 'Fui até uma loja da Vivo para contratar um novo plano de celular e, durante o processo de atendimento, o vendedor me ofereceu diversos serviços adicionais sem deixar claro que seriam cobrados à parte. Quando recebi a fatura, percebi que estava sendo cobrado muito mais do que havia sido combinado. Tentei entrar em contato com a Vivo para solucionar o problema, mas o atendimento ao cliente foi muito demorado e pouco eficiente.',
              id: 3,
              status: 'Aberta',
              data: '2023/01/02', // AAAA/MM/DD
              horario: '14:30:00'
            }
          ]
        },
        {
          nome: 'Oi',
          id: 2,
          cnpj: '76.535.764/0001-43',
          reclamacoes: [
            {
              nome: 'Alexandre',
              sobrenome: 'Silva',
              username: '@alexandre1910',
              reclamacao: 'Contratei um pacote de TV, internet e telefone fixo da Oi e, desde o primeiro dia de uso, tive problemas com a conexão de internet que oscilava muito e caía com frequência. Além disso, a qualidade do sinal da TV era muito ruim e o telefone apresentava muitas interferências durante as ligações. Tentei entrar em contato com a Oi diversas vezes para solucionar o problema, mas o atendimento ao cliente foi muito ineficiente e pouco prestativo. Após várias tentativas, solicitei o cancelamento do contrato, mas fui informado que teria que pagar uma multa rescisória, mesmo tendo motivos justificáveis para o cancelamento.',
              id: 4,
              status: 'Aberta',
              data: '2022/11/28', // AAAA/MM/DD
              horario: '12:39:42'
            },
          ]
        },
        {
          nome: 'Tim',
          id: 3,
          cnpj: '02.421.421/0001-11',
          reclamacoes: [
            {
              nome: 'João',
              sobrenome: 'Seixas',
              username: '@joaopaulo272',
              reclamacao: 'Contratei um plano de celular da TIM que incluía uma quantidade de dados móveis, minutos de voz e mensagens de texto ilimitados. No entanto, após algumas semanas de uso, percebi que a velocidade da internet estava muito abaixo do que havia sido prometido, a cobertura da rede era insuficiente em muitas áreas e eu não conseguia realizar ligações em algumas regiões. Tentei entrar em contato com a TIM para solucionar o problema, mas o atendimento ao cliente foi muito demorado e pouco eficiente. Além disso, fui informado que, devido a um contrato de fidelidade, eu teria que pagar uma multa caso quisesse cancelar o plano.',
              id: 5,
              status: 'Resolvida',
              data: '2022/08/01', // AAAA/MM/DD
              horario: '20:24:56'
            },
          ]
        },
        {
          nome: 'Claro',
          id: 4,
          cnpj: '40.432.544/0001-47',
          reclamacoes: [
            {
              nome: 'Guilherme',
              sobrenome: 'Duffes',
              username: '@duffes1777',
              reclamacao: 'Contratei um plano de internet e telefone fixo da Claro e, após alguns dias de uso, percebi que a velocidade da internet era muito inferior à que havia sido prometida. Além disso, a linha telefônica apresentava muitas interferências e ruídos, tornando as ligações praticamente impossíveis. Tentei entrar em contato com a empresa diversas vezes para solucionar o problema, mas o atendimento ao cliente foi ineficiente e pouco prestativo.',
              id: 6,
              status: 'Resolvida',
              data: '2022/10/20', // AAAA/MM/DD
              horario: '19:09:12'
            },
          ]
        },
        {
          nome: 'Itau',
          id: 5,
          cnpj: '60.701.190/0001-04',
          reclamacoes: [
            {
              nome: 'Rodrigo',
              sobrenome: 'Vianna',
              username: '@viannarodr40',
              reclamacao: 'Fiz um empréstimo no Itaú e, ao receber o contrato, percebi que havia uma taxa de juros muito mais alta do que a que havia sido informada no momento da contratação. Tentei entrar em contato com o banco para esclarecer o erro, mas fui informado que não havia possibilidade de negociação e que a taxa seria mantida. Além disso, o processo de liberação do empréstimo foi muito demorado e burocrático, o que me causou transtornos financeiros.',
              id: 7,
              status: 'Aberta',
              data: '2022/06/28', // AAAA/MM/DD
              horario: '12:39:42'
            },
          ]
        },
        {
          nome: 'Bradesco',
          id: 6,
          cnpj: '60.746.948/0001-12',
          reclamacoes: [
            {
              nome: 'Rodrigo',
              sobrenome: 'Costa',
              username: '@rodrigocosta34',
              reclamacao: 'Abri uma conta no Bradesco e, após algumas semanas, descobri que estavam sendo cobradas diversas taxas e tarifas que não haviam sido informadas no momento da abertura da conta. Quando tentei cancelar a conta, fui informado que seria cobrada uma taxa adicional de encerramento, o que não havia sido informado antes. Além disso, o atendimento ao cliente foi muito demorado e pouco eficiente.',
              id: 8,
              status: 'Aberta',
              data: '2022/12/12', // AAAA/MM/DD
              horario: '12:39:42'
            },
          ]
        },
        {
          nome: 'Santander',
          id: 7,
          cnpj: '90.400.888/0001-42',
          reclamacoes: [
            {
              nome: 'Nelson',
              sobrenome: 'Grossoni',
              username: '@grossnelson',
              reclamacao: 'Comprei um ingresso para um evento esportivo, mas quando cheguei ao local fui informado que o evento havia sido cancelado e não havia nenhuma previsão de reembolso.',
              id: 9,
              status: 'Resolvida',
              data: '2022/05/06', // AAAA/MM/DD
              horario: '12:39:42'
            },
          ]
        },
        {
          nome: '123 Milhas',
          id: 8,
          cnpj: '26.669.170/0001-57',
          reclamacoes: [
            {
              nome: 'Felipe',
              sobrenome: 'Barbosa',
              username: '@barbfelpo',
              reclamacao: 'Comprei uma passagem aérea pela empresa 123 Milhas e, ao chegar no aeroporto, descobri que o voo havia sido cancelado e não fui avisado antecipadamente. Tentei entrar em contato com a empresa para reagendar o voo ou obter reembolso, mas não obtive resposta.',
              id: 10,
              status: 'Aberta',
              data: '2023/01/15', // AAAA/MM/DD
              horario: '12:39:42'
            },
            {
              nome: 'Maria',
              sobrenome: 'Souza',
              username: '@mariasouza',
              reclamacao: 'Fiz a compra de passagens aéreas pela 123 Milhas e tive uma péssima experiência. Primeiramente, o site apresentou muita instabilidade, e foi difícil concluir a compra. Além disso, ao finalizar a transação, recebi um e-mail informando que a reserva não havia sido confirmada, mesmo após o pagamento ser processado. Tentei entrar em contato com a empresa por telefone e e-mail, mas não obtive resposta. Fiquei muito insatisfeito com o serviço prestado pela 123 Milhas e espero uma solução para o meu problema.',
              id: 11,
              status: 'Resolvida',
              data: '2023/03/17', // AAAA/MM/DD
              horario: '23:49:17'
            },
          ]
        }
      ],
      empresa: '',
      mockLogin: [
        {
          nome: 'Maria',
          sobrenome: 'Souza',
          username: '@mariasouza',
          email: 'mariasouza@gmail.com',
          id: Math.floor((Math.random() * 1000) + 1000),
          senha: 'Teste@12345',
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw158skapMS264YKsP7PW2zrZDBiz5AevfmqHcfKk&s',
          definicao: 'consumidor'
        },
        {
          nome: 'Rodrigo',
          sobrenome: 'Costa',
          username: '@rodrigocosta34',
          email: 'rodrigo@gmail.com',
          id: Math.floor((Math.random() * 1000) + 1000),
          senha: 'Teste@123',
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBOLtvPKBIfVjTIzpeyw4GUIAIyS3OE8ex5gI265c&s',
          definicao: 'consumidor'
        },
        {
          nome: 'Vivo',
          username: '@vivo',
          cnpj: '02.449.992/0056-38',
          email: 'vivo@reclamacoes.com.br',
          id: 1,
          senha: 'Admin@123',
          avatar: 'https://www.partagenorteshoppingnatal.com.br/wp-content/uploads/sites/11/2022/12/Logo-Vivo.png',
          definicao: 'empresa'
        }
      ],
      logado: false,
      definicao: '',
      usuario: '',
      login: '',
      password: '',
      isDataLoaded: false,
    };
  }

  handleMobileMenu = () => {
    let menu = document.querySelector('#menu');
    if (menu.classList.contains('active'))
      menu.classList.remove('active');
    else
      menu.classList.add('active');
  };

  limpaSugestoes = (listaSugestoes) => {
    while (listaSugestoes.firstChild) {
      listaSugestoes.removeChild(listaSugestoes.firstChild);
    }
  }

  clicouSugestao = (e, listaSugestoes, input, id) => {
    this.limpaSugestoes(listaSugestoes);
    input.value = e.target.textContent;
    id === 'search' ? this.handleSearch() : this.handleFind();
  }

  handleNavigateSuggestions = (e) => {
    const el = document.querySelectorAll('.sugested');
    if(el.length > 0 && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter')) {
      // converter objetos array-like, como NodeList ou HTMLCollection em um array padrão.
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
        // e.target.id === 'search' ? (document.querySelector('#search').value = el[selected].textContent, this.handleSearch()) : (document.querySelector('#find').value = el[selected].textContent, this.handleFind());
      }
      selected !== -1 ? el[selected].classList.add('selected') : null;
    }
  };

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

  handleSearch = (e) => {
    let company = document.querySelector('#search').value.toLowerCase();
    const suggestions = document.querySelector('.suggestions');

    if(this.state.empresas.some(item => (item.nome.toLowerCase()) === company)) {
      this.setState({ empresa: company });
      e === undefined ? document.querySelector('.header_btn').click() : null;
      this.limpaSugestoes(suggestions);
      document.querySelector('#search').value = '';
    }
    else {
      e.preventDefault();
      document.querySelector('#search').focus();
    }
  }

  handleFind = (e) => {
    let company = document.querySelector('#find').value.toLowerCase();
    const suggestions = document.querySelector('.suggestions');

    if(this.state.empresas.some(item => (item.nome.toLowerCase()) === company)) {
      this.setState({ empresa: company });
      e === undefined ? document.querySelector('.find-button').click() : null;
      this.limpaSugestoes(suggestions);
      document.querySelector('#find').value = '';
    }
    else {
      e.preventDefault();
      document.querySelector('#find').focus();
    }
  };

  handleLogin = (e) => {
    this.setState({ login: e.target.value });
    let value = e.target.value;
    const warning = document.querySelector('#login_warning');
    const pattern = e.target.pattern;
    if(value !== ''&& value.match(pattern) === null) {
      e.target.classList.add(style.error);
      warning.classList.add(style.warning);
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove(style.warning);
    }
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
    let value = e.target.value;
    const warning = document.querySelector('#pass_warning');
    const pattern = e.target.pattern;
    if(value !== ''&& value.match(pattern) === null) {
      e.target.classList.add(style.error);
      warning.classList.add(style.warning);
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove(style.warning);
    }
  };

  handleValidation = (e) => {
    const { mockLogin, login, password } = this.state;
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

  handleNome = (e) => {
    let value = e.target.value;
    const warning = document.querySelector('#nome__sign_warning');
    const pattern = e.target.pattern;
    if(value !== '' && value.match(pattern) === null) {
      e.target.classList.add(style.error);
      warning.classList.add('warning');
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove('warning');
    }
  };

  handleSobrenome = (e) => {
    let value = e.target.value;
    const warning = document.querySelector('#sobrenome__sign_warning');
    const pattern = e.target.pattern;
    if(value !== '' && value.match(pattern) === null) {
      e.target.classList.add(style.error);
      warning.classList.add('warning');
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove('warning');
    }
  };

  handleCNPJ = (e) => {
    let value = e.target.value;
    const warning = document.querySelector('#cnpj__sign_warning');
    const pattern = e.target.pattern;
    if(value !== '' && value.match(pattern) === null) {
      e.target.classList.add(style.error);
      warning.classList.add('warning');
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove('warning');
    }
  };

  handleEmail = (e) => {
    let value = e.target.value;
    const warning = document.querySelector('#email__sign_warning');
    const pattern = e.target.pattern;
    if(value !== '' && value.match(pattern) === null) {
      e.target.classList.add(style.error);
      warning.classList.add('warning');
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove('warning');
    }
  };

  handleLoginSign = (e) => {
    let value = e.target.value;
    const warning = document.querySelector('#login__sign_warning');
    const pattern = e.target.pattern;
    if(value !== '' && value.match(pattern) === null) {
      e.target.classList.add(style.error);
      warning.classList.add('warning');
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove('warning');
    }
  };
  
  handlePassSign = (e) => {
    let value = e.target.value;
    const warning = document.querySelector('#pass__sign_warning');
    const pattern = e.target.pattern;
    if(value !== '' && value.match(pattern) === null) {
      e.target.classList.add(style.error);
      warning.classList.add('warning');
    } else {
      e.target.classList.remove(style.error);
      warning.classList.remove('warning');
    }
  };

  handleCreateUser = (e) => {
    const { mockLogin, empresas } = this.state;

    if(document.querySelector('#empresa').checked || document.querySelector('#consumidor').checked) {
    
      const name = document.querySelector('#nome');
      const typeAcc = document.querySelector('#empresa').checked ? 'empresa' : 'consumidor';
      const info = document.querySelector('#info');
      const email = document.querySelector('#email');
      const username = document.querySelector('#login-signup');
      const password = document.querySelector('#senha-signup');
      const check = [ name, info, email, username, password ].some(item => item.classList.contains('_error_niu8q_111'));
  
      if(name.value.length && email.value.length && username.value.length && password.value.length && info.value.length && !check) {
        if(typeAcc === 'consumidor') {
          mockLogin.push({
            nome: name.value,
            username: username.value,
            sobrenome: info.value,
            email: email.value,
            id: Math.floor((Math.random() * 1000) + 1000),
            senha: password.value,
            avatar: 'https://picsum.photos/200',
            definicao: typeAcc
          });   
        } else {
          mockLogin.push({
            nome: name.value,
            username: username.value,
            cnpj: info.value,
            email: email.value,
            id: Math.floor((Math.random() * 1000) + 1000),
            senha: password.value,
            avatar: 'https://picsum.photos/200',
            definicao: typeAcc
          });
          empresas.push({
          nome: mockLogin[mockLogin.length -1].nome,
          id: mockLogin[mockLogin.length -1].id,
          cnpj: mockLogin[mockLogin.length -1].cnpj,
          imageURL: mockLogin[mockLogin.length -1].avatar,
          reclamacoes: []
        });
        }
        this.setState({ mockLogin: mockLogin, empresas: empresas });
      } else {
        e.preventDefault();
        alert('Preencha todas as informações corretamente');
      }
    } else {
      e.preventDefault();
      alert('Escolha o tipo de conta');
    }
  }

  handleLogout = () => {
    this.setState({
      logado: false,
      usuario: '',
      definicao: ''
    });
  };

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

  handleStatus = (dado) => {
    dado.status = 'Resolvida';
  };

  handleAnswer = (param, company) => {
    const { empresas } = this.state;
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

  handleLogos = async () => {
    const { empresas } = this.state;

    let logos = await fetch('../../src/assets/db.json')
    .then(response => response.json())
    .then(data => data);
    logos.map(item => {
      empresas.map(empresa => {
        if(item.company === empresa.nome)
          empresa.imageURL = item.imageURL;
      });
    });
    this.setState({ isDataLoaded: true });
  };

  componentDidMount() {
    this.handleLogos();
  }

  handleSelectedCompany = () => {
    this.setState({ empresa: '' });
  };
  
  render() {
    const { empresas, empresa, logado, usuario, definicao, isDataLoaded } = this.state;

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
          <Route path='/' element={ <Content handleSuggestions={ this.handleSuggestions } event={ this.handleFind } empresas={ empresas } logado={ logado } definicao={ definicao } handleSelectedCompany={ this.handleSelectedCompany } handleNavigateSuggestions={ this.handleNavigateSuggestions } /> } />
          <Route path='/login' element={ <Login event={ this.handleValidation } handleLogin={ this.handleLogin } handlePassword={ this.handlePassword } /> } />
          <Route path='/signup' element={ <Signup event={ this.handleCreateUser } handleNome={ this.handleNome } handleSobrenome={ this.handleSobrenome } handleCNPJ={ this.handleCNPJ } handleEmail={ this.handleEmail } handleLoginSign={ this.handleLoginSign } handlePassSign={ this.handlePassSign } /> } />
          <Route path='/empresa' element={ <Empresa empresas={ empresas } status={ this.handleStatus } answer={ this.handleAnswer } usuario={ usuario } /> } />
          <Route path='/historico' element={ <Historico empresas={ empresas } empresa={ empresa } logado={ logado } /> } />
          <Route path='/cliente' element={ <Cliente cliente={ empresas } usuario={ usuario } event={ this.handleDeleteClaim } /> } />
          <Route path='/open' element={ <AddReclamacao empresas={ empresas } event={ this.handleClaim } usuario={ usuario } definicao={ definicao } empresa={ empresa } /> } />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
