import { Article } from "@/entities/Article";

export const article: Article = {
    id: '1',
    img: '',
    createdAt: '',
    views: 100500,
    user: {id: '1', username: '123'},
    blocks: [],
    type: [],
    title: '123',
    subtitle: 'wdhwfhwkef'
}

export const mockArticle = [
    {
        url: __API__ + '/articles?_limit=3',
        method: 'GET',
        status: 200,
        response: [
            {...article, id: '1'},
            {...article, id: '2'},
            {...article, id: '3'}
        ],
    },
]