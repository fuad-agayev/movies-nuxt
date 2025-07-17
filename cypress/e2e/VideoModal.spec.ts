/// <reference types="cypress" />

describe('My first Cypress testing and film video flows testing', () => {
  it('Select category, open trailers, close videomodal', () => {
    cy.visit('/films')

    cy.contains('MOST POPULAR').click()

    cy.get('[data-cy=movie-card]').first().click()
  })
})
