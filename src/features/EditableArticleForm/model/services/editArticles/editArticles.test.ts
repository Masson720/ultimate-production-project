import axios, { AxiosInstance } from "axios";
import { ArticleForm } from "../../types/AddArticleFormSchema";
import { getUserAuthData, User } from "@/entities/User";
import { ArticleBlockType, ArticleType } from "@/entities/Article";
import { validateArticle } from "../validateArticle/validateArticle";
import { editArticle } from "./editArticles";
import { ValidateErrors } from "../../consts/validateTypes";

jest.mock("../validateArticle/validateArticle");
jest.mock("@/entities/User");

describe('features/EditableArticleForm/editArticles', () => {
    let dispatch: jest.Mock;
    let getState: jest.Mock;
    let api: typeof axios;
    let extra: { api: AxiosInstance };
    let rejectWithValue: jest.Mock;
    let articleData: ArticleForm;
    let userData: User;
    
    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
        api = axios;
        extra = { api };
        rejectWithValue = jest.fn((value) => value);

        articleData = {
            id: "1",
            title: "text",
            subtitle: "text",
            img: "http",
            views: 1,
            createdAt: "03.09.24",
            type: [ArticleType.SCIENCE],
            blocks: [
                {
                    type: ArticleBlockType.IMAGE,
                    src: 'http',
                    title: 'text',
                    id: '1'
                }
            ]
        }
        userData = {
            id: "1",
            username: "admin"
        };
        jest.spyOn(api, 'put').mockResolvedValue({ data: articleData });
    });

    test('Должен вернуть data если редактирование прошло успешно', async () => {
        (getUserAuthData as jest.Mock).mockReturnValue(userData);
        (validateArticle as jest.Mock).mockReturnValue([]);
        
        const thunk = editArticle(articleData);
        const result = await thunk( getState, dispatch, extra );

        expect(getUserAuthData).toHaveBeenCalledWith(getState());
        expect(validateArticle).toHaveBeenCalledWith(articleData);
        expect(api.put).toHaveBeenCalledWith('/articles/1', articleData);
        expect(result.payload).toEqual({ 
            id: "1",
            title: "text",
            subtitle: "text",
            img: "http",
            views: 1,
            createdAt: "03.09.24",
            type: [ArticleType.SCIENCE],
            blocks: [
                {
                    type: ArticleBlockType.IMAGE,
                    src: 'http',
                    title: 'text',
                    id: '1'
                }
            ]
        });
    });

    test('Должен вернуть ошибки по валидации', async () => {
        const validationErrors = [ValidateErrors.NO_TITLE];
        (getUserAuthData as jest.Mock).mockReturnValue(userData);
        (validateArticle as jest.Mock).mockReturnValue(validationErrors);

        const thunk = editArticle(articleData);
        const result = await thunk( getState, dispatch, extra );

        expect(validateArticle).toHaveBeenCalledWith(articleData);
        expect(result.payload).toEqual(validationErrors);
    });

    test('Должен обрабатывать ошибку сервера', async () => {
        (getUserAuthData as jest.Mock).mockReturnValue(userData);
        (validateArticle as jest.Mock).mockReturnValue([]);

        jest.spyOn(api, 'put').mockResolvedValue({ data: null });

        const thunk = editArticle(articleData);
        const result = await thunk( getState, dispatch, extra );
        expect(api.put).toHaveBeenCalledWith('/articles/1', articleData);
        expect(result.payload).toEqual([ValidateErrors.SERVER_ERROR]);
    })

    test('Должен возвращать SERVER_ERROR, если пользовательские данные не пришли', async () => {
        (getUserAuthData as jest.Mock).mockReturnValue(null);

        const thunk = editArticle(articleData);
        const result = await thunk( getState, dispatch, extra );
        expect(getUserAuthData).toHaveBeenCalledWith(getState());
        expect(result.payload).toEqual([ValidateErrors.SERVER_ERROR]);
        expect(api.put).not.toHaveBeenCalled();
    })
})