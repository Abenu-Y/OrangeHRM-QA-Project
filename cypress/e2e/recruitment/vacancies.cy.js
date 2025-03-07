import vacanciesPage from '../../page/VacanciesPage';

const VacanciesPage = new vacanciesPage();

describe('Vacancy Management', () => {

  before(() => {
    cy.fixture('vacancies').as('vacancyData');
  })

  beforeEach(() => {
    VacanciesPage.gotoRecruitmentPageandVacanciesTab()
    // cy.fixture('vacancies').as('vacancyData');
  });


  it('TC1 - Should add a new vacancy with mandatory fields', () => {
    cy.fixture('vacancies').then(({ new_vacancies }) => {
      VacanciesPage.addVacancy(new_vacancies);
      cy.url().should('match', /\/recruitment\/addJobVacancy\/.+$/);
    });
  });

  it('TC2 - Validate mandatory fields and error messages', function () {
    VacanciesPage.openAddVacancyForm();
    VacanciesPage.validateMandatoryFields(this.vacancyData.fields);
  });

  it('TC3 - Should search for vacancies using different criteria and verify results', () => {
    cy.get('@vacancyData').then(({ search_criteria }) => {
      search_criteria.forEach((criteria) => {
        VacanciesPage.searchVacancy(criteria);
      });
    })
  });


  // TC4: Update an existing vacancy (e.g., Vacancy Name, Hiring Manager)
  it('TC4 - Should update an existing vacancy details', () => {
    VacanciesPage.clickRandomCandidateEditIcon()
    VacanciesPage.updateVacancyDetail(4)
  });

  // TC5: Delete a vacancy with confirmation prompt
  it('TC5 - Should delete a vacancy with confirmation prompt', () => {
    VacanciesPage.getRecordCount().then((initialCount) => {
      VacanciesPage.clickRandomCandidateDeleteIcon();
      VacanciesPage.confirmDelete();
      VacanciesPage.getUpdatedRecordCount().should((newCount) => {
        expect(newCount).to.equal(initialCount - 1); // Ensure the count decreased by 1
      });
    });
  });

  afterEach(() => {
    // Runs after each test (e.g., take screenshots for failed tests)
    if (Cypress.currentTest.state === 'failed') {
        cy.screenshot();
    }
});
});
