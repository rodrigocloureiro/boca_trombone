// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user) => {
  // preenchendo os campos de username e password
  cy.get('input[name=login]').type(user.username)
  cy.get('input[name=senha]').type(user.password)

  // verificando se o login foi validado com sucesso
  cy.get('#btn_login').click()
})

Cypress.Commands.add('criarAcc', (user) => {
  cy.visit('/signup') // visita a página de cadastre-se

  cy.get('#consumidor').check() // seleciona o tipo de conta como consumidor

  cy.get('#nome').type(user.nome) // preenche o nome

  cy.get('#sobrenome').type(user.sobrenome) // preenche o sobrenome

  cy.get('#email').type(user.email) // preenche o email

  cy.get('input[name="login"]').type(user.username) // preenche o login

  cy.get('input[name="senha"]').type(user.password) // preenche a senha

  cy.contains('Cadastrar').click() // clica para cadastrar

  cy.url().should('include', '/') // verifica se a conta foi cadastrada com sucesso
})