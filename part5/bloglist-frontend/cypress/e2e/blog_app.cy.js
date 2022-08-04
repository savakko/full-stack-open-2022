const user = {
  name: 'Matti Luukkainen',
  username: 'mluukkai',
  password: 'salainen'
}
const blogData = {
  author: 'Cypress Automated',
  url: 'url.by.cypress'
}

describe('Blog application', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('input[name="Username"]').type(user.username)
    cy.get('input[name="Password"]').type(user.password)

    cy.get('#submit-login').click()
    cy.contains('login successful')
    cy.contains('logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('input[name="Username"]').type(user.username)
    cy.get('input[name="Password"]').type('wrong')
    cy.get('#submit-login').click()

    cy.get('.error')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'login successful')
  })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.login(user)
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#blog-title') .type('Title by Cypress')
      cy.get('#blog-author').type(blogData.author)
      cy.get('#blog-url')   .type(blogData.url)
      cy.get('#submit-new-blog').click()
      cy.contains('Title by Cypress')
    })

    describe('when several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'First Title',  ...blogData })
        cy.createBlog({ title: 'Second Title', ...blogData })
        cy.createBlog({ title: 'Third Title',  ...blogData })
      })

      it('a blog can be liked', function () {
        cy.contains('Second Title')
          .contains('view')
          .click()
        cy.contains('likes')
          .as('likeCount')
          .contains('0')

        cy.contains('like').click()
        cy.get('@likeCount').contains('1')
      })
    })
  })
})