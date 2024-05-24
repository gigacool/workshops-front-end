
//We will test the behavior of of the login page
// In other tests, we will log programmatically rather than by using the GUI
describe('Login to quackers', () => {
  
  it('Login button should be enabled only when form is filled', () => {
    //Go to the login page
    cy.visit('/login')

    //Various states of the form
    cy.get('[data-testid="submit-button"]').should('be.disabled')

    cy.get("#login_username").type("username")
    cy.get('[data-testid="submit-button"]').should('be.disabled')

    cy.get("#login_password").type("password")
    //Now the form is filled, we should be able to submit
    cy.get('[data-testid="submit-button"]').should('be.enabled')

    //Not filled anymore
    cy.get("#login_username").clear()
    cy.get('[data-testid="submit-button"]').should('be.disabled')

  })

  it('Redirects to app on login', () => {
    
    //Initialize interception
    //Note: the 'ok' parameter is used in the app to actually check if the login was succesfull
    cy.intercept("/api/users/login", {statusCode : 200, body: {ok: true}})
    //Go to the login page
    cy.visit('/login')

    cy.get("#login_username").type("username")
    cy.get("#login_password").type("password")
    cy.get('[data-testid="submit-button"]').click()

    cy.url().should('equal', Cypress.config().baseUrl + '/app')
  })

})