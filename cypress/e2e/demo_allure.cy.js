describe('🔍 Allure Report Test', () => {
  it('✅ เปิดเว็บไซต์สำเร็จ', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('Kitchen Sink')
  })
})
