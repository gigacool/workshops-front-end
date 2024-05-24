describe('Quackers Home Page', () => {
  
  it('Display quacks', () => {
    //Load the mocked quacks
    cy.fixture('quacks').then(quacks => {
      //Prepare interception for the call to quacks
      cy.intercept('/api/quacks', { body : quacks}).as('getQuacks')

      //Go to the application home page
      cy.visit('/')

      //Whenever the call has been completed
      cy.wait('@getQuacks').then(() => {
        //Check the number of displayed quacks
        cy.get('[data-testid|="quack"]').should('have.length', quacks.length)

        //Each quack should be displayed
        quacks.forEach(quack => {
          //High level check : correct content for a given quack
          cy.get(`[data-testid="quack-${quack.key}"]`).contains(quack.content)
        })
      })
    })
  })

  
})