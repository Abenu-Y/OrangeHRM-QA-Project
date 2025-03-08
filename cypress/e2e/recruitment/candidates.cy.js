import RecruitmentCandidatePage from '../../page/CandidatePage';

describe('Recruitment Module', () => {
    const recruitmentCandidatePage = new RecruitmentCandidatePage();

    before(() => {
        cy.fixture('candidatesData').as('data');
      })

    beforeEach(() => {
        recruitmentCandidatePage.gotoRecruitementPage();
    });

    it('TC_Rec_01: Verify adding a new candidate', () => {
        const filePath = 'plan.pdf';
       
        cy.get('@data').then(({ new_candidates }) => {
           
            const { name , middle_name , last_name , email , contact} = new_candidates;
            recruitmentCandidatePage.addCandidate(name , middle_name , last_name , email , contact)
            //? verify
            recruitmentCandidatePage.verifyCandidateAdded()
          });

       

        // // Select job title
        // // cy.get('.oxd-select-text-input').click();
        // // cy.contains('Senior QA Lead').click();

        // // Upload file (Resume)
        // // cy.get('input[type="file"]').attachFile(filePath, { force: true });


    });

    it('TC_Rec_02: Verify mandatory field validation', () => {
        recruitmentCandidatePage.getAddCandidateButton().click();
        recruitmentCandidatePage.getSaveButton().click();
        recruitmentCandidatePage.verifyMandatoryFieldValidation();
    });

    it('TC_Rec_03: Verify searching for a candidate by name', () => {
        recruitmentCandidatePage.searchCandidateByName('John Doe');
        cy.contains('John Doe').should('be.visible'); // Ensure the candidate is found
    });

    it('TC_Rec_04: Verify searching for candidates by status', () => {
        recruitmentCandidatePage.searchCandidateByStatus('Shortlisted');
        cy.contains('Shortlisted').should('be.visible');
    });

    it('TC_Rec_05: Verify updating candidate details', () => {
        recruitmentCandidatePage.clickRandomCandidateEyeIcon();
        recruitmentCandidatePage.updateCandidateDetails('Updated First Name');
        recruitmentCandidatePage.verifySuccessAlert('Succesfully Updated');
    });

    it('TC_Rec_06: Verify deleting a candidate', () => {
        recruitmentCandidatePage.getRecordCount().then((initialCount) => {
            recruitmentCandidatePage.clickRandomCandidateDeleteIcon();
            recruitmentCandidatePage.confirmDelete();
            recruitmentCandidatePage.getUpdatedRecordCount().should((newCount) => {
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
