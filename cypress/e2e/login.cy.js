import '../support/commands'

describe('testes envolvendo login', () => {
  it('efetuando login', () => {
    cy.visit('/login') // visitando a página de login
    cy.login({username: '@rodrigocosta34', password: 'Teste@123'}) // realiza a chamada do custom command e tenta efetuar login

    // verificando se a opção de logout está sendo exibida na tela após o login
    cy.get('#logout').should('contain', 'Sair')
  })

  it('efetuando logout', () => {
    cy.visit('/login') // visitando a página de login
    cy.login({username: '@rodrigocosta34', password: 'Teste@123'}) // realiza a chamada do custom command e tenta efetuar login

    cy.get('#logout').click() // efetua logout ao clicar no botão correspondente
  })

  it('login com dados inválidos', () => {
    cy.visit('/login') // visitando a página de login
    cy.login({username: 'luizjr77', password: 'abracadabra'}) // realiza a chamada do custom command e tenta efetuar login

    cy.get('#login_warning').should('contain', '3 a 15 caracteres. Deve começar com @') // verifica se o aviso de username inválido foi exibido
    cy.get('#pass_warning').should('contain', '8 a 16 caracteres, incluindo pelo menos um símbolo, letra maiúscula e número') // verifica se o aviso de password inválida foi exibido
    cy.get('#general_warning').should('contain', 'Login ou senha incorretos') // verifica se o aviso referente a falha no login foi exibido
  })
})
