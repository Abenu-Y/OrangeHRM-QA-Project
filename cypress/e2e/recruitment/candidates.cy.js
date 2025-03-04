import RecruitmentPage from '../../page/CandidatePage';

describe('Recruitment Module', () => {
    const recruitmentPage = new RecruitmentPage();

    beforeEach(() => {
        recruitmentPage.gotoRecruitementPage();
    });

    it('TC_Rec_01: Verify adding a new candidate', () => {
        const filePath = 'plan.pdf';
    
        recruitmentPage.addCandidate('Abebe','Beso','Bela','abe.beso@gmail.com',555-555-5555)
        //? verify
        recruitmentPage.verifyCandidateAdded()
       
        // // Select job title
        // // cy.get('.oxd-select-text-input').click();
        // // cy.contains('Senior QA Lead').click();
    
        // // Upload file (Resume)
        // // cy.get('input[type="file"]').attachFile(filePath, { force: true });
    
      
    });

    it('TC_Rec_02: Verify mandatory field validation', () => {
        recruitmentPage.getAddCandidateButton().click();
        recruitmentPage.getSaveButton().click();
        recruitmentPage.verifyMandatoryFieldValidation(); // Verify that "Full Name" field is required
    });

    it('TC_Rec_03: Verify searching for a candidate by name', () => {
        recruitmentPage.searchCandidateByName('Kebede');
        cy.get('.oxd-autocomplete-text-input--after')
        cy.get('.oxd-autocomplete-text-input--before')
        cy.contains('John Doe').should('be.visible'); // Ensure the candidate is found
    });

    it('TC_Rec_04: Verify searching for candidates by status', () => {
        recruitmentPage.searchCandidateByStatus('Shortlisted');
        cy.contains('Shortlisted').should('be.visible'); 
    });

    it('TC_Rec_05: Verify updating candidate details', () => {
        recruitmentPage.clickRandomCandidateEyeIcon();
        recruitmentPage.updateCandidateDetails('Updated First Name');
        recruitmentPage.verifySuccessAlert('Succesfully Updated');
    });
    
    it.only('TC_Rec_06: Verify deleting a candidate', () => {
        recruitmentPage.getRecordCount().then((initialCount) => {
            recruitmentPage.clickRandomCandidateDeleteIcon();
            recruitmentPage.confirmDelete();
            recruitmentPage.getUpdatedRecordCount().should((newCount) => {
                expect(newCount).to.equal(initialCount - 1); // Ensure the count decreased by 1
            });
        });
    });
    
    
});
