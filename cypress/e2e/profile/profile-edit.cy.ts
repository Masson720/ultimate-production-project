let profileId: string;

describe('Пользователь заходить на страницу профиля', () => {
    beforeEach(()=> {
        cy.visit('')
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`)
        })
    });
    it('И профиль успешно загружается', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'Хлепс')
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    })
    it('И редактирует его', () => {
        const newName = 'new';
        const newLastname = 'lastname';
        cy.updateProfile(newName, newLastname);
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'new');
        cy.getByTestId('ProfileCard.lastname').should('have.value', 'lastname');
    });
})