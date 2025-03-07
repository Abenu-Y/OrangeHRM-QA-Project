import loginPage from './LoginPage'
const LoginPage = new loginPage()

class RecruitmentPage {

    constructor() {
        this.tableCard = '.oxd-table-card';
        this.eyeIcon = '.oxd-table-cell-actions > :nth-child(1) > .oxd-icon';
        this.deleteIcon = '.oxd-table-cell-actions > :nth-child(2) > .oxd-icon'
        this.switchInput = '.oxd-switch-input';
        this.firstNameField = '.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input';
        this.saveButton = '.oxd-form-actions > .oxd-button';
    }

    //*locators
    getAddCandidateButton() { return cy.get('.orangehrm-header-container > .oxd-button'); }

    getFirstNameField() { return cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input'); }
    getMiddleNameField() { return cy.get(':nth-child(2) > :nth-child(2) > .oxd-input'); }
    getLastNameField() { return cy.get(':nth-child(3) > :nth-child(2) > .oxd-input'); }
    getEmailField() { return cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'); }
    getContactField() { return cy.get('.oxd-grid-3 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'); }
    getKeyWordsField() { return cy.get('.orangehrm-save-candidate-page-full-width > .oxd-input-group > :nth-child(2) > .oxd-input'); }
    getCheckBox() { return cy.get('input[type="checkbox"]'); }
    getSaveButton() { return cy.get('.oxd-button--secondary'); }

    
    getErrorMessage() { return cy.get('.error-message'); }
    getSearchFieldByName() { return cy.get('.oxd-autocomplete-text-input > input') }
    getSearchButton() { return cy.get('.oxd-form-actions > .oxd-button--secondary'); }
    getCandidateStatusDropdownBtn() { return cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'); }
    getStatusDropDown() { return cy.get('.oxd-select-dropdown') }
    getConfirmationMessage() { return cy.get('.oxd-form > .oxd-text--h6'); }


    gotoRecruitementPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        LoginPage.login('Admin', 'admin123')
        // cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'); 
        cy.get(':nth-child(5) > .oxd-main-menu-item').click()
    }

    //*actions
    addCandidate(firstName, middleName, lastName, email, contact) {
        this.getAddCandidateButton().click();
        this.getFirstNameField().type(firstName);
        this.getMiddleNameField().type(middleName);
        this.getLastNameField().type(lastName);
        this.getEmailField().type(email);
        this.getContactField().type(contact);
        this.getKeyWordsField().type('keywords').type('notes');
        this.getCheckBox().check({ force: true });
        this.getSaveButton().click();
    }

    verifyCandidateAdded() {
        this.getConfirmationMessage().should('contain', 'Application Stage');
    }

    verifyMandatoryFieldValidation() {
        cy.get('.--name-grouped-field > :nth-child(1) > .oxd-text, .--name-grouped-field > :nth-child(2) > .oxd-text, .--name-grouped-field > :nth-child(3) > .oxd-text')
            .each(($el) => cy.wrap($el).should('contain', 'Required'));
        cy.contains('Required', { timeout: 60000 }).should('be.visible');
    }

    searchCandidateByName(name) {
        this.getSearchFieldByName().type(name);
        // this.getSearchButton().click();
    }

    searchCandidateByStatus(status) {
        this.getCandidateStatusDropdownBtn().click();
        this.getStatusDropDown().contains(status).click();
        this.getSearchButton().click();
    }

    clickRandomCandidateEyeIcon() {
        cy.get(this.tableCard).then(($cards) => {
            const count = $cards.length;
            if (count === 0) {
                cy.log('No candidates found!');
                return;
            }
            const randomIndex = Math.floor(Math.random() * count);
            cy.get(this.tableCard)
                .eq(randomIndex)
                .find(this.eyeIcon)
                .click();
        });
    }


    updateCandidateDetails(firstName) {
        cy.get(this.switchInput).click();
        cy.get(this.firstNameField).clear().type(firstName);
        cy.get(this.saveButton).click();
    }

    verifySuccessAlert(expectedMessage) {
        cy.get('.oxd-toast', { timeout: 3000 }) // Wait up to 5 seconds if needed
            .should('exist') // Ensure the toast appears
        // .and('contain', expectedMessage); // Assert its content

        cy.on('window:alert', (alert) => {
            expect(alert).to.equal(expectedMessage);
            cy.get('.oxd-toast').should('contain', expectedMessage)
        });

    }

    getCandidateByName(name) {
        return cy.contains(name);
    }

    // Method to get the current number of records
    getRecordCount() {
        return cy.get('.orangehrm-horizontal-padding > .oxd-text').invoke('text').then((text) => {
            return parseInt(text.match(/\d+/)[0]); // Extract the number from the text
        });
    }

    clickRandomCandidateDeleteIcon() {
        cy.get('.oxd-table-card').then(($cards) => {
            const randomIndex = Math.floor(Math.random() * $cards.length); // Randomly select a card
            cy.wrap($cards[randomIndex]).find('.oxd-table-cell-actions > :nth-child(2) > .oxd-icon').click();
        });
    }

    // Method to confirm deletion
    confirmDelete() {
        cy.get('.oxd-button--label-danger').click(); // Click delete confirmation button
    }

    // Method to get the updated number of records
    getUpdatedRecordCount() {
        return cy.get('.orangehrm-horizontal-padding > .oxd-text').invoke('text').then((updatedText) => {
            return parseInt(updatedText.match(/\d+/)[0]); // Extract the new number of records
        });
    }

}

export default RecruitmentPage;
