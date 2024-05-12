let currentArticleId = ''; 

describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
      cy.login();
      cy.createArticle().then((article) => {
          currentArticleId = article.id;
          cy.visit(`articles/${article.id}`)
      });
      
  })
  afterEach(() => {
      cy.removeArticle(currentArticleId);
  })
  //Создали статью - протестировали все что нужно - удалили статью
      it.skip('И видит содержимое статьи', () => {
          cy.getByTestId('ArticleDetails.Info').should('exist');
      })
      it.skip('И видит рекоммендации', () => {
          cy.getByTestId('ArticleRecomendationsList').should('exist');
      })
      it.skip('И оставляет комментарии', () => {
          cy.getByTestId('ArticleDetails.Info');
          cy.getByTestId('AddCommentForm').scrollIntoView();
          cy.addComment('text');
          cy.getByTestId('CommentCard.Content').should('have.length', 1);
      })
      it.skip('И ставит оценку', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 5);
    })
      it.skip('И ставит оценку (пример со стабом на фикстурах)', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' })
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 5);
    })
})