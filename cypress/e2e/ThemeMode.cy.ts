
/// <reference types="cypress" />

describe('Theme toggle - html class kontrolü', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should toggle dark and light mode', () => {
    cy.wait(1000) // gerekirse bekle

    // Başlangıçta dark mode olmalı
    cy.get('html').should('have.class', 'dark')

    // Toggle ile light moda geç
    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('html').should('not.have.class', 'dark')

    // Toggle ile tekrar dark moda dön
    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('html').should('have.class', 'dark')
  })
})

