import '../support/commands'

describe('testes envolvendo criação de reclamações', () => {
  it('efetuando reclamação', () => {
    cy.visit('/login') // visitando a página de login
    cy.login({username: '@mariasouza', password: 'Teste@12345'}) // realiza a chamada do custom command e efetua login

    cy.get('a[title="Reclame aqui de uma empresa"]').click() // clica no botão para realizar uma reclamação

    cy.get('#listCompany').select('Claro') // seleciona a empresa Claro para fazer a reclamação

    cy.get('#claim').type('Não gostei dos serviços prestados. Sinal muito instável, não consigo usufruir. Exijo o cancelamento') // adiciona o conteúdo da reclamação

    cy.get('#btn_add_claim').click() // clica no botão para enviar a reclamação

    cy.get('#confirm').should('have.text', 'Confirmar e Enviar').click() // confirma os dados e envia a reclamação
  })

  it('tentando efetuar reclamação de forma inválida', () => {
    cy.visit('/login') // visitando a página de login
    cy.login({username: '@mariasouza', password: 'Teste@12345'}) // realiza a chamada do custom command e efetua login

    cy.get('a[title="Reclame aqui de uma empresa"]').click() // clica no botão para realizar uma reclamação

    cy.get('#btn_add_claim').click() // clica no botão para enviar a reclamação

    cy.get('#listCompany').should('have.css', 'color', 'rgb(255, 0, 0)') // verifica se a cor do texto é vermelha

    cy.get('#claim').should('have.css', 'color', 'rgb(255, 0, 0)') // verifica se a cor do texto é vermelha
  })

  it('escrevendo a reclamação e voltando para alguma correção', () => {
    cy.visit('/login') // visitando a página de login
    cy.login({username: '@mariasouza', password: 'Teste@12345'}) // realiza a chamada do custom command e efetua login

    cy.get('a[title="Reclame aqui de uma empresa"]').click() // clica no botão para realizar uma reclamação

    cy.get('#listCompany').select('Claro') // seleciona a empresa Claro para fazer a reclamação

    cy.get('#claim').type('Estão cobrando juros indevidos. Venho aqui solicitar o ressarcimento') // adiciona o conteúdo da reclamação

    cy.get('#btn_add_claim').click() // clica no botão para enviar a reclamação

    cy.get('#cancel').click() // clica no botão para voltar e editar algo na reclamação
  })
})
