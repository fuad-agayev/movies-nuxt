

/// <reference types="cypress" />

describe('Watchlist Add & Remove E2E Test', () => {
  it('should add a movie to watchlist and then remove it from the watchlist page', () => {
    // Anasayfa
    cy.visit('/')

    // İlk filmin üç nokta menüsünü aç
    cy.get('[data-testid="movie-options-btn"]').first().click()

    // Watchlist butonuna tıkla (menüde)
    cy.get('[data-testid="toggle-watchlist-btn"]').click()

    // Watchlist sayfasına git
    cy.visit('/watchlist')

    // Watchlistte film başlığı var mı kontrol et
    cy.get('.text-lg.font-semibold').should('exist')

    // Remove butonuna tıkla
    cy.wait(2000)
    cy.contains('Remove').click()

    // Film listede olmamalı
   
    cy.get('.text-lg.font-semibold').should('not.exist')
  })
})