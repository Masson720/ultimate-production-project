import { ThunkExtraArg } from "@/app/providers/StoreProvider/config/StateSchema";
import axios, { AxiosInstance } from "axios";
import { ArticleForm } from "../../types/AddArticleFormSchema";
import { getUserAuthData, User } from "@/entities/User";
import { ArticleBlockType, ArticleType } from "@/entities/Article";
import { validateArticle } from "../validateArticle/validateArticle";
import { addNewArticle } from "./addNewArticle";
import { getFormData } from "../../selectors/addArticleFormSelectors";
import { ValidateErrors } from "../../consts/validateTypes";

jest.mock("../validateArticle/validateArticle");
jest.mock("../../selectors/addArticleFormSelectors");
jest.mock("@/entities/User");

describe('features/EditableArticleForm/addNewArticle', () => {
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
        jest.spyOn(api, 'post').mockResolvedValue({ data: articleData });
    });

    test('Должен вернуть data если статья успешно создалась', async () => {
        (getUserAuthData as jest.Mock).mockReturnValue(userData);
        (getFormData as jest.Mock).mockReturnValue(articleData);
        (validateArticle as jest.Mock).mockReturnValue([]);

        const thunk = addNewArticle();
        const result = await thunk( getState, dispatch, extra );

        expect(getUserAuthData).toHaveBeenCalledWith(getState());
        expect(getFormData).toHaveBeenCalledWith(getState());
        expect(validateArticle).toHaveBeenCalledWith(articleData);
        expect(api.post).toHaveBeenCalledWith('/articles', {...articleData, userId: userData.id});
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
        (getFormData as jest.Mock).mockReturnValue(articleData);
        (validateArticle as jest.Mock).mockReturnValue(validationErrors);

        const thunk = addNewArticle();
        const result = await thunk( getState, dispatch, extra );

        expect(validateArticle).toHaveBeenCalledWith(articleData);
        expect(result.payload).toEqual(validationErrors);
    });

    test('Должен обрабатывать ошибку сервера', async () => {
        (getUserAuthData as jest.Mock).mockReturnValue(null);

        const thunk = addNewArticle();
        const result = await thunk( getState, dispatch, extra );

        expect(getUserAuthData).toHaveBeenCalledWith(getState());
        expect(result.payload).toEqual([ValidateErrors.SERVER_ERROR]);
        expect(api.post).not.toHaveBeenCalled();
    })
})