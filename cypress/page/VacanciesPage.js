class VacanciesPage {
  // Locators

  constructor() {
    this.tableCard = '.oxd-table-card';
    this.editIcon = '.oxd-table-cell-actions > :nth-child(2) > .oxd-icon';
    this.deleteIcon = '.oxd-table-cell-actions > :nth-child(1) > .oxd-icon'
    this.noOfVacancy = '.oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input';
    this.saveBtn = '.oxd-button--secondary';
  }

  elements = {
    addButton: () => cy.get('.orangehrm-header-container > .oxd-button'),
    vacancyNameInput: () => cy.get('.oxd-form > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
    jobTitleDropdown: () => cy.get('.oxd-select-text'),
    jobTitleOptions: () => cy.get('.oxd-select-dropdown'),
    descriptionInput: () => cy.get('.oxd-textarea'),
    hiringManagerInput: () => cy.get('.oxd-autocomplete-text-input > input'),
    hiringManagerDropdown: () => cy.get('.oxd-autocomplete-dropdown'),
    noOfPositionsInput: () => cy.get('.oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input'),
    saveButton: () => cy.get('.oxd-button--secondary'),
    searchFields: {
      vacancyName: () => cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
      jobTitle: () => cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
      hiringManager: () => cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
      status: () => cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text')
    },
    searchButton: () => cy.get('.oxd-form-actions > .oxd-button--secondary'),
    table: () => cy.get('.oxd-table'),
    validationErrors: () => cy.get('.oxd-input-field-error-message')
  };

  addVacancy({ name, job_title, hiring_manager, no_of_positions, description }) {
    this.elements.addButton().click();
    this.elements.vacancyNameInput().type(name);

    this.elements.jobTitleDropdown().click();
    this.elements.jobTitleOptions().contains(job_title).click();

    this.elements.descriptionInput().type(description);
    this.elements.noOfPositionsInput().type(no_of_positions);

    this.elements.hiringManagerInput().type(hiring_manager);
    cy.wait(2000);
    this.elements.hiringManagerDropdown().find('div').first().click();

    this.elements.saveButton().click();
  }


  openAddVacancyForm() {
    cy.get('.orangehrm-header-container > .oxd-button').click();
  }


  validateMandatoryFields(fields) {
    fields.forEach(({ name, jobTitle, hiringManager, expectedErrors }) => {
      this.fillVacancyForm({ name, jobTitle, hiringManager });

      // Validate error messages
      expectedErrors.forEach(({ text, count }) => {
        cy.get('.oxd-input-field-error-message')
          .filter(`:contains("${text}")`)
          .should('have.length', count);
      });

    });
  }

  fillVacancyForm({ name, jobTitle, hiringManager }) {
    // Clear previous inputs
    cy.get('.oxd-input').eq(0).clear();
    cy.get('.oxd-autocomplete-text-input > input').clear();

    // Select Job Title dropdown
    cy.get('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains('Select').click(); // Assuming "Select" is a placeholder

    // Fill fields conditionally
    if (name) cy.get('.oxd-input').eq(0).type(name);
    if (jobTitle) {
      cy.get('.oxd-select-text').click();
      cy.get('.oxd-select-dropdown').contains(jobTitle).click();
    }
    if (hiringManager) {
      cy.get('.oxd-autocomplete-text-input > input').type(hiringManager);
      cy.wait(2000);
      cy.get('.oxd-autocomplete-dropdown').find('div').first().click();
    }

    // Submit form
    cy.get('.oxd-button--secondary').click();
  }


  searchVacancy({ vacancyName, jobTitle, hiringManager, status }) {
    // Clear previous search inputs
    cy.get('.oxd-input').clear();

    // Fill in search criteria if provided
    if (vacancyName) {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
      cy.get('.oxd-select-dropdown').contains(vacancyName).click();
    }

    if (jobTitle) {
      cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
      cy.get('.oxd-select-dropdown').contains(jobTitle).click();
    }

    if (hiringManager) {
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
      cy.get('.oxd-select-dropdown').contains(hiringManager).click();
    }

    if (status) {
      cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
      cy.get('.oxd-select-dropdown').contains(status).click();
    }

    // Click search button
    cy.get('.oxd-form-actions > .oxd-button--secondary').click();

    // Validate search results
    cy.get('.oxd-table').should('be.visible'); // Table should be visible
    cy.get('.orangehrm-horizontal-padding > .oxd-text').should('contain', 'Record Found');
  }

  gotoRecruitmentPageandVacanciesTab() {
    cy.login(Cypress.env('validUsername'), Cypress.env('validPassword'))
    cy.get(':nth-child(5) > .oxd-main-menu-item').click()
    cy.get(':nth-child(2) > .oxd-topbar-body-nav-tab-item').click()
  }

  clickRandomCandidateEditIcon() {
    cy.get(this.tableCard).then(($cards) => {
      const count = $cards.length;
      if (count === 0) {
        cy.log('No candidates found!');
        return;
      }
      const randomIndex = Math.floor(Math.random() * count);
      cy.get(this.tableCard)
        .eq(randomIndex)
        .find(this.editIcon)
        .click();
    });
  }

  updateVacancyDetail(no) {
    cy.get(this.noOfVacancy).clear().type(no);
    cy.get(this.saveBtn).click();
  }

  getRecordCount() {
    return cy.get('.orangehrm-horizontal-padding > .oxd-text').invoke('text').then((text) => {
      return parseInt(text.match(/\d+/)[0]); // Extract the number from the text
    });
  }

  confirmDelete() {
    cy.get('.oxd-button--label-danger').click(); // Click delete confirmation button
  }

  // Method to get the updated number of records
  getUpdatedRecordCount() {
    return cy.get('.orangehrm-horizontal-padding > .oxd-text').invoke('text').then((updatedText) => {
      return parseInt(updatedText.match(/\d+/)[0]); // Extract the new number of records
    });
  }

  clickRandomCandidateDeleteIcon() {
    cy.get('.oxd-table-card').then(($cards) => {
      const randomIndex = Math.floor(Math.random() * $cards.length); // Randomly select a card
      cy.wrap($cards[randomIndex]).find('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon').click();
    });
  }

}

export default VacanciesPage;
