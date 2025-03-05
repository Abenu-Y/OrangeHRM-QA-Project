describe('Security and Access Control Tests', () => {

    it.only('Ensures password is not sent in plaintext', () => {
      cy.intercept('POST', '**/auth/validate', (req) => {
        console.log(req.body)
        console.log('Headers:', req.headers);

        if (typeof req.body === 'string') {
          const params = new URLSearchParams(req.body);
          // console.log('Parsed Password:', params.get('password'));
          expect(params.get('password')).to.not.equal(Cypress.env('validPassword')); // Ensure it's not plaintext
        }
      }).as('loginRequest');
  
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
      cy.get('input[name="username"]').type(Cypress.env('validUsername'));
      cy.get('input[name="password"]').type(Cypress.env('validPassword'), { log: false }); // Don't log the password
      cy.get('button[type="submit"]').click();
  
      cy.wait('@loginRequest');
    });
  
    it('Should redirect to login page when trying to access restricted page without login', () => {
      // Visit the restricted page directly
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addJobVacancy');
  
      // Assert that the user is redirected to the login page
      cy.url().should('include', '/web/index.php/auth/login'); 
      
      // Optional: You can also check for specific elements on the login page to ensure proper redirection
      cy.get('h5').should('contain', 'Login'); 
    });
  
  });
  