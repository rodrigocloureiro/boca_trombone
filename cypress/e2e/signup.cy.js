import '../support/commands'

const user = {nome: 'Afonso', sobrenome: 'Silva', email: 'silva.afonso@gmail.com', username: '@afonso.s', password: 'User@456'};
const reclamacao = {empresa: 'Tim', conteudo: 'Desde que assinei não consigo usar devido ao sinal instável, quero o cancelamento.'};

describe('testes envolvendo criação de conta', () => {
  it('criando conta para usuário', () => {
    cy.visit('/signup') // visita a página de cadastre-se

    cy.get('#consumidor').check() // seleciona o tipo de conta como consumidor

    cy.get('#nome').type('Luiz') // preenche o nome

    cy.get('#sobrenome').type('Castro') // preenche o sobrenome

    cy.get('#email').type('luizcastro@gmail.com') // preenche o email

    cy.get('input[name="login"]').type('@luizcastro') // preenche o login

    cy.get('input[name="senha"]').type('User@123') // preenche a senha

    cy.contains('Cadastrar').click() // clica para cadastrar

    cy.url().should('include', '/') // verifica se a conta foi cadastrada com sucesso
  })

  it('criando conta e logando na conta nova', () => {
    cy.criarAcc(user) // cria a conta

    cy.contains('Login').click() // visita a página de login

    cy.login(user) // efetua o login com os dados enviados
  })

  it('criando conta e verificando reclamações de uma empresa', () => {
    cy.criarAcc(user) // cria a conta
    
    cy.contains('Login').click() // visita a página de login

    cy.login(user) // efetua o login com os dados enviados

    cy.get('#search').type('Vivo') // pesquisa pela empresa para ver as reclamações

    cy.get('#header_btn').click() // realiza a pesquisa
  })

  it('criando conta e adicionando reclamação', () => {
    cy.criarAcc(user) // cria a conta
    
    cy.contains('Login').click() // visita a página de login

    cy.login(user) // efetua o login com os dados enviados

    cy.get('a[title="Reclame aqui de uma empresa"]').click() // vai para a área de adicionar reclamação

    cy.get('#listCompany').select(reclamacao.empresa) // seleciona a empresa

    cy.get('#claim').type(reclamacao.conteudo) // adiciona o conteúdo da reclamação

    cy.contains('Enviar reclamação').click() // envia a reclamação

    cy.contains('Confirmar e Enviar').click() // confirma o envio da reclamação

    cy.contains('Área do Consumidor').click() // vai para a área do usuário

    cy.contains(reclamacao.conteudo) // verifica se a reclamação foi adicionada
  })
})
