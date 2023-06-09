import '../support/commands'

describe('testes com edição de reclamação', () => {
  it('editando reclamação', () => {
    cy.visit('/login') // visita a página de login

    cy.get('#login').type('@mariasouza') // preenche o username

    cy.get('#senha').type('Teste@12345') // preenche a senha

    cy.get('a[href="/"]').contains('Login').click() // efetua o login

    cy.contains('Área do Consumidor').click() // vai para a área do consumidor

    cy.contains('Editar').click() // clicar em editar

    cy.get('[data-cy="edit_claim"]').clear() // limpa a reclamaçao selecionada

    cy.get('[data-cy="edit_claim"]').type('Não estou gostando do serviço. Espero que resolvam meu problema logo ou entrarei na justiça!') // escreve sua alteração

    cy.contains('Salvar edição').click() // salva sua edição

    cy.contains('Confirmar').click() // confirma a edição

    cy.contains('Não estou gostando do serviço. Espero que resolvam meu problema logo ou entrarei na justiça!') // verifica se a edição foi bem sucedida
  })
})
