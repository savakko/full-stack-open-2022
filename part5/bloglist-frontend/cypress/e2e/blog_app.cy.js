describe('Blog application', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page opens', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('input:first').type('mluukkai')
    cy.get('input:last').type('salainen')
  })
})