import { selectByTestId } from '../../e2e/helpers/selectByTestId';

export const setRate = (starsCount = 5, feedback = '') => {
    cy.getByTestId(`StarRating.${starsCount }`).click();
    cy.getByTestId('RatingCard.Input').type(feedback);
    cy.getByTestId('RatingCard.Send').click();
};

export const getByTestId = (testId: string) => {
    return cy.get(selectByTestId(testId));
}

declare global {
    namespace Cypress { 
        interface Chainable {
            setRate(starsCount: number, feedback: string): Chainable<void>
        }
    }
}