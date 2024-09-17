import axios, { AxiosInstance } from "axios";
import { deleteArticle } from "./deleteArticle";

const mockApi = jest.createMockFromModule<jest.Mocked<AxiosInstance>>('axios');

describe('entities/Article/deleteArticle', () => {
    const getStateMock = jest.fn();
    const dispatchMock = jest.fn();
    const extra = { api: mockApi }

    test('Должен выдать SERVER_ERROR если нет id пользователя', async () => {
        const thunk = deleteArticle('');
        await thunk(dispatchMock, getStateMock, extra)
        const { calls } = dispatchMock.mock;
        expect(calls).toHaveLength(2);
        const [ start, end ] = calls;
        expect(end[0].payload).toBe('SERVER_ERROR');
    })

    test('Должен вернуть объект Article если запрос выполнился удачно', async () => {
        const article = { id: '1', title: 'Test Article' };
        mockApi.delete.mockResolvedValueOnce({data: article});
        const thunk = deleteArticle('1');
        const result = await thunk(
            dispatchMock,
            getStateMock,
            extra
        );
        expect(result.payload).toEqual(article);
    })

    test('Должен вернуть объект Article если запрос выполнился удачно', async () => {
        mockApi.delete.mockResolvedValueOnce(undefined);
        const thunk = deleteArticle('1');
        const result = await thunk(
            dispatchMock,
            getStateMock,
            extra
        );
        expect(result.payload).toBe('SERVER_ERROR');
    })
})