import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById"
import { ArticleDetailsSchema } from "../types/articleDetailsSchema"
import { articleDetailsReducer } from "./articleDetailsSlice"


const initialState: ArticleDetailsSchema = {
    isLoading: true,
    error: undefined,
    data: undefined
}

const article = {
    id: '1',
    name: 'article'
}

describe('entities/Article/articleDetailsSlice extraReducers', () => {
    test('Должен вернуть newState с data равным article', () => {
        const action = {
            type: fetchArticleById.fulfilled.type,
            payload: article
        }
        const newState = articleDetailsReducer(initialState, action);
        expect(newState.data).toEqual(article);
    });
    test('Должен вернуть newState с loading равным true', () => {
        const action = {
            type: fetchArticleById.pending.type
        }
        const newState = articleDetailsReducer(initialState, action);
        expect(newState.isLoading).toBe(true);
    });
    test('Должен вернуть newState с error равным строке error', () => {
        const action = {
            type: fetchArticleById.rejected.type,
            payload: 'error'
        }
        const newState = articleDetailsReducer(initialState, action);
        expect(newState.error).toBe('error');
    });
})