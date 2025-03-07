import loginPage from '../../page/LoginPage';

describe('Security and Access Control Tests', () => {
  const LoginPage = new loginPage();
  before(() => {
      // Setup intercepts or environment variables before any tests run
      cy.intercept('POST', '**/auth/validate', (req) => {

          if (typeof req.body === 'string') {
              const params = new URLSearchParams(req.body);
              // Ensure password is not sent in plaintext
              expect(params.get('password')).to.equal(Cypress.env('validPassword'));
          }
      }).as('loginRequest');
  });

  it('Ensures password is not sent in plaintext', () => {
      // Visit the login page
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      LoginPage.login(Cypress.env('validUsername'), Cypress.env('validPassword'))

      // Wait for the intercepted login request and assert password
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

  afterEach(() => {
      // Runs after each test (e.g., take screenshots for failed tests)
      if (Cypress.currentTest.state === 'failed') {
          cy.screenshot();
      }
  });
});
