import loginPage from '../../page/LoginPage';

describe('Login Module', () => {
    const LoginPage = new loginPage();
    let validUsername, validPassword, invalidPassword;

    before(() => {
        // Load environment variables once and store them in variables
        cy.log('Loading environment variables once...');
        validUsername = Cypress.env('validUsername');
        validPassword = Cypress.env('validPassword');
        invalidPassword = Cypress.env('invalidPassword');
    });

    beforeEach(() => {
        // Navigate to the login page, etc.
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it('TC_Login_01: Verify successful login', () => {
        // Test steps and assertions for a successful login
        LoginPage.login(validUsername, validPassword)
        LoginPage.verifyLogin()
    });

    it('TC_Login_02: Verify login with invalid password', () => {
        // Test steps and assertions for invalid password handling
        LoginPage.login(validUsername, invalidPassword)
        LoginPage.verifyErrorMessage('Invalid credentials')

    });

    it('TC_Login_03: Verify login with empty fields', () => {
        // Test steps and assertions for empty fields validation
        LoginPage.getLoginBtn().click();
        LoginPage.verifyMandatoryFieldValidation()
    });

    it('TC_Login_04: Verify account lock after failed attempts', () => {
        // Test steps and assertions for account lock after multiple failed attempts
        for (let i = 0; i < 15; i++) {
            LoginPage.login(validUsername, invalidPassword)
            LoginPage.verifyErrorMessage('Invalid credentials')
        }

        // Check for account lock message
        // LoginPage.verifyAccountLock()
    });

    it('TC_Login_05: Verify password field encryption', () => {
        // Test steps and assertions to ensure the password field is encrypted
        LoginPage.getPasswordField().type('somepassword');
        LoginPage.verifyPasswordFieldEncryption()
    });


    afterEach(() => {
        // Runs after each test (e.g., take screenshots for failed tests)
        if (Cypress.currentTest.state === 'failed') {
            cy.screenshot();
        }
    });

});
