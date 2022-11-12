const user = {
  name: 'Admin',
  username: 'admin',
  password: 'admin'
}

describe('General', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('homepage can be opened', () => {
    cy.contains('Notes')
  })

  it('user can login', () => {
    cy.contains('Show Login').click()

    cy.get('[placeholder="Username"]').type('admin')
    cy.get('[placeholder="Password"]').type('admin')

    cy.get('#form-login-button').click()

    cy.contains('Create a new note')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show Login').click()

    cy.get('[placeholder="Username"]').type('bad user')
    cy.get('[placeholder="Password"]').type('bad password')

    cy.get('#form-login-button').click()

    cy.get('.error').should('contain', 'Wrong credentials')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: user.username, password: user.password })
    })

    it('user can create a note', () => {
      const noteContent = 'A note created by cypress'
      cy.contains('Show Create Note').click()
      cy.get('input').type(noteContent)
      cy.contains('save').click()
      cy.contains(noteContent)
    })

    describe('and a note exists', () => {
      const testNote = {
        content: 'Hello world',
        important: false
      }

      beforeEach(() => {
        cy.createNote(testNote)
      })

      it('it can be made important', () => {
        cy.contains(testNote.content).as('Note')

        cy.get('@Note').contains('make important').click()

        cy.get('@Note').contains('make not important')
      })
    })
  })
})
