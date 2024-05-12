
export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click()          ;
    cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
    cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
    cy.getByTestId("EditableProfileCardHeader.SaveButton").click();
};

export const resetProfile = (profileId: string) => {
    return  cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: {Authorization: 'uefiuf'},
        body: {
            id: "1",
            first: "Хлепс",
            lastname: "Батонов",
            age: 465,
            currency: "USD",
            country: "Ukraine",
            city: "Moscow",
            username: "admin213",
            avatar: "https://tlgrm.ru/_/stickers/a93/ee9/a93ee975-aea5-4466-ba64-cbb4a0fb4fab/10.jpg"
        },
    });
}

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>
            resetProfile(profileId: string): Chainable<void>
        }
    }
}