import '../support/commands'

describe('testes envolvendo respostas das reclamações', () => {
  it('respondendo reclamação', () => {
    cy.visit('/login') // visitando a página de login
    cy.login({username: '@vivo', password: 'Admin@123'}) // realiza o login a partir do custom command

    cy.contains('Área da Empresa').click() // procura um elemento com o texto 'Área da Empresa' e efetua o click
    cy.contains('@mariasouza').click() // procura uma reclamação com o texto '@mariasouza' e efetua o click

    cy.get('textarea').type('Bom dia, gostaríamos de informar que seu caso foi resolvido. Desculpe o transtorno. A Vivo agradece.') // escreve a resposta da reclamação

    cy.contains('Enviar resposta').click() // procura o elemento com texto 'Enviar resposta' e efetua o click

    cy.get('#confirm').click() // elemento com id confirm e efetua o click

    cy.contains('Área da Empresa').click() // procura o elemento com texto 'Área da Empresa' e efetua o click

    cy.contains('Bom dia, gostaríamos de informar que seu caso foi resolvido. Desculpe o transtorno. A Vivo agradece.') // verifica se a resposta foi computada
  })

  it('respondendo e fechando reclamação', () => {
    cy.visit('/login') // visitando a página de login
    cy.login({username: '@vivo', password: 'Admin@123'}) // realiza o login a partir do custom command

    cy.contains('Área da Empresa').click() // procura um elemento com o texto 'Área da Empresa' e efetua o click
    cy.contains('@mariasouza').click() // procura uma reclamação com o texto '@mariasouza' e efetua o click

    cy.get('textarea').type('Bom dia, gostaríamos de informar que seu caso foi resolvido. Desculpe o transtorno. A Vivo agradece.') // escreve a resposta da reclamação

    cy.contains('Enviar resposta').click() // procura o elemento com texto 'Enviar resposta' e efetua o click

    cy.get('#confirm').click() // elemento com id confirm e efetua o click

    cy.contains('Área da Empresa').click() // procura o elemento com texto 'Área da Empresa' e efetua o click

    cy.contains('Bom dia, gostaríamos de informar que seu caso foi resolvido. Desculpe o transtorno. A Vivo agradece.') // verifica se a resposta foi computada

    cy.get('#close_claim_1').click() // procura o elemento com id 'close_claim_1' e efetua o click
  })
})
