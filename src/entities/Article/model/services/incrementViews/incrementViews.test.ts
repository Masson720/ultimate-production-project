import { getUserAuthData } from "@/entities/User";
import { AxiosInstance } from "axios";
import { incrementViews } from "./incrementViews";
import { Article } from "../../types/article";

jest.mock('../../../../User/model/selectors/gatUserAuthData/getUserAuthData');

describe('entities/Article/incrementViews', () => {

    const mockApi = jest.createMockFromModule<jest.Mocked<AxiosInstance>>('axios');
    const getStateMock = jest.fn();
    const dispatchMock = jest.fn();
    const extra = { 
        api: mockApi
    }
    const article = {
        id: '1',
        name: 'article',
        views: 1
    } as unknown as Article;

    const userData = {
        id: '1'
    }

    test('Должен вернуть article в случае успешного запроса', async () => {
        (getUserAuthData as jest.Mock).mockReturnValue(userData);
        mockApi.put.mockResolvedValue({data: {...article, views: article.views + 1}});
        const thunk = incrementViews(article);
        const result = await thunk(dispatchMock, getStateMock, extra);
        expect(result.payload).toEqual({...article, views: 2});
    });

    test('Должен вернуть NO_DATA если не передано userData', async () => {
        (getUserAuthData as jest.Mock).mockReturnValue(undefined);
        mockApi.put.mockResolvedValue({data: {...article, views: article.views + 1}});
        const thunk = incrementViews(article);
        const result = await thunk(dispatchMock, getStateMock, extra);
        expect(result.payload).toBe('NO_DATA');
    });

    test('Должен вернуть SERVER_ERROR если в ответ ничего не пришло', async () => {
        (getUserAuthData as jest.Mock).mockReturnValue(userData);
        mockApi.put.mockResolvedValue(undefined);
        const thunk = incrementViews(article);
        const result = await thunk(dispatchMock, getStateMock, extra);
        expect(result.payload).toBe('SERVER_ERROR');
    });
})