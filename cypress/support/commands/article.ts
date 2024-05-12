import { Article } from '../../../src/entities/Article/index';

//Доделать строптивый тест

const defaultArticle = {
    id: "14",
    title: "Python news",
    subtitle: "Что нового в JS за 2022 год?",
    img: "https://zsfond.ru/wp-content/uploads/2021/03/piton-1-1024x578.jpg",
    views: 1022,
    createdAt: "26.02.2022",
    userId: "1",
    type: [
      "IT"
    ],
    blocks: []
}

export const createArticle = (article?: Article) => {
    return cy.request({
        method: 'POST',
        url: `http://localhost:8000/articles`,
        headers: {Authorization: 'uefiuf'},
        body: article ?? defaultArticle,
    }).then(resp => resp.body);
};

export const removeArticle = (articleId: string) => {
    return  cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/articles/${articleId}`, 
        headers: {Authorization: 'uefiuf'},
    });  
}

declare global {
    namespace Cypress {
        interface Chainable { 
            createArticle(article?: Article): Chainable<Article>
            removeArticle(articleId: string): Chainable<void>
        }
    }
}