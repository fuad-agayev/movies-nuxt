/// <reference types="cypress" />

describe('Info Modal flow', () => {
  it('should open and close the info modal from the Banner', () => {
    // Sayfayı ziyaret et
    cy.visit('/') // veya `/` eğer Banner anasayfadaysa

    // 'More Info' butonunu bul ve tıkla
    cy.contains('More Info').first().click()

    // Modal açılmış mı kontrol et
    cy.get('[data-cy=info-modal]', { timeout: 5000 }).should('be.visible')

    // Modal içeriğinde film başlığı veya açıklaması var mı kontrol et
    cy.get('[data-cy=info-modal]').within(() => {
      cy.get('h2').should('exist')
      cy.contains('Release:').should('exist')
    })

    // Kapat butonuna tıkla
    cy.get('[data-cy=info-modal]').find('button').first().click()

    // Modal kapanmış mı kontrol et
    cy.get('[data-cy=info-modal]').should('not.exist')
  })
})
