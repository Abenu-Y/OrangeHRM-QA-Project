class loginPage{


    //* locators
    getUserNameField(){ return cy.get('input[name="username"]')}
    getPasswordField(){ return cy.get('input[name="password"]')}
    getLoginBtn(){ return cy.get('.oxd-button')}
    getErrorMessage(){ return cy.get('.oxd-alert-content > .oxd-text')}

    //? actions
    login(username, password) {
        this.getUserNameField().type(username);
        this.getPasswordField().type(password);
        this.getLoginBtn().click();
    }

   //* Verification function for successful login
    verifyLogin() {
     cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Dashboard');
     cy.contains('Dashboard', { timeout: 60000 }).should('be.visible');
   }

   //* Verification function for error message (invalid credentials)
    verifyErrorMessage(expectedMessage) {
        this.getErrorMessage().should('contain', expectedMessage);  // Verify error message
        cy.contains(expectedMessage, { timeout: 60000 }).should('be.visible'); // Ensure visibility
    }

   //* Verification function for account lock message after failed attempts
    verifyAccountLock() {
        cy.get('.oxd-alert-content > .oxd-text').should('contain', 'Account locked');
    }

   //* Verification function for password field encryption
    verifyPasswordFieldEncryption() {
        this.getPasswordField().should('have.attr', 'type', 'password'); // Ensure password field is encrypted
    }

   //* Function for mandatory field validation
    verifyMandatoryFieldValidation() {
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text, :nth-child(3) > .oxd-input-group > .oxd-text')
            .each(($el) => {
                cy.wrap($el).should('contain', 'Required');
            });
        cy.contains('Required', { timeout: 60000 }).should('be.visible');
    }
}

export default loginPage;