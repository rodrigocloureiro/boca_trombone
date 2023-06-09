import '../support/commands'

describe('testes envolvendo remoção de reclamações', () => {
  it('deletando reclamação', () => {
    cy.visit('/login') // visitando a página de login
    cy.login({username: '@rodrigocosta34', password: 'Teste@123'}) // efetua login

    cy.get('a[title="Área do consumidor"]').click() // entra na área do consumidor

    cy.get('#remove').click() // clica para remover a reclamação

    cy.get('#confirm').click() // clica para confirmar a exclusão da reclamação

    cy.get('h2 span').should('have.text', '@rodrigocosta34') // verifica se a reclamação foi excluída com sucesso, redirecionando o usuário para sua p[agina novamente
  })
})
