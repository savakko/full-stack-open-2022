const rootUser = {
  username: 'root',
  password: 'sekret'
}

describe('Blog application', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page opens', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('input[name="Username"]').type(rootUser.username)
    cy.get('input[name="Password"]').type(rootUser.password)

    cy.get('#submit-login').click()
    cy.contains('login successful')
    cy.contains('logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input[name="Username"]').type(rootUser.username)
      cy.get('input[name="Password"]').type(rootUser.password)
      cy.get('#submit-login').click()
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#blog-title') .type('a new title created by cypress')
      cy.get('#blog-author').type('a new author created by cypress')
      cy.get('#blog-url')   .type('a new url created by cypress')
      cy.get('#submit-new-blog').click()
      cy.contains('a new title created by cypress')
    })
  })
})