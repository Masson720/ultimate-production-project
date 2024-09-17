import { ValidateErrors } from "../../consts/validateTypes";
import { fetchArticleById } from "./fetchArticleById";
import { AxiosInstance } from "axios";


const mockApi = jest.createMockFromModule<jest.Mocked<AxiosInstance>>('axios');

const getStateMock = jest.fn();
const dispatchMock = jest.fn();

const thunkApiMock = {
    extra: { api: mockApi },
    rejectWithValue: jest.fn(),
}

describe('features/EditableArticleForm/fetchArticleById', () => {
    test('Должен вернуть данные статьи если articleId валидный', async () => {
        const article = { id: '1', title: 'Test Article' };

        mockApi.get.mockResolvedValueOnce({data: article});

        const thunk = fetchArticleById('1')
        const result = await thunk(
            dispatchMock,
            getStateMock,
            thunkApiMock.extra
        );

        expect(mockApi.get).toHaveBeenCalledWith('/articles/1', {
            params: { _expand: 'user' }
        });
        expect(result.payload).toEqual(article);
    });

    test('Должен возвращать SERVER_ERROR если id статьи не указан', async () => {
        mockApi.get.mockRejectedValueOnce(new Error('Network Error'));

        const thunk = fetchArticleById(undefined);
        const result = await thunk(
            dispatchMock,
            getStateMock,
            thunkApiMock.extra
        );
        expect(result.payload).toEqual([ValidateErrors.SERVER_ERROR]);
    });

    test('Должен возвращать SERVER_ERROR если запрос выполнился неудачно', async () => {
        mockApi.get.mockRejectedValueOnce(new Error('Network Error'));

        const thunk = fetchArticleById('1');
        const result = await thunk(
            dispatchMock,
            getStateMock,
            thunkApiMock.extra
        );
        expect(result.payload).toEqual([ValidateErrors.SERVER_ERROR]);
    })
})