import axios, { AxiosInstance } from "axios";
import { saveJsonSettings } from "./saveJsonSettings";
import { User } from "../../types/user";
import { JsonSettings } from "../../types/jsonSettings";
import { Theme } from "@/shared/const/theme";
import { getUserAuthData } from "../../selectors/gatUserAuthData/getUserAuthData";
import { setJsonSettingsMutation } from "@/entities/User/api/userApi";

jest.mock("../../selectors/gatUserAuthData/getUserAuthData");

jest.mock('../../../api/userApi', () => ({
    setJsonSettingsMutation: jest.fn(),
  }));

describe('entities/User/saveJsonSettings', () => {
    const responsePending = 'user/saveJsonSettings/pending';
    const responseRejected = 'user/saveJsonSettings/rejected';
    const responseFulfilled = 'user/saveJsonSettings/fulfilled';
    let dispatch: jest.Mock;
    let getState: jest.Mock;
    let api: typeof axios;
    let extra: { api: AxiosInstance };
    let rejectWithValue: jest.Mock;
    let userData: User;
    let jsonSettings: JsonSettings;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
        api = axios;
        rejectWithValue = jest.fn((value) => value);
        extra = { 
            api
        };
        userData = {
            id: "1",
            username: "admin"
        };
        jsonSettings = {
            theme: Theme.LIGHT,
            isFirstVisit: true,
            settingsHasBeenOpen: true,
            isArticlePageWasOpened: true
        }
        jest.spyOn(api, 'patch').mockResolvedValue({ data: jsonSettings });
    });

    test('Должен кидать ошибку NO_DATA', async () => {
        const thunk = saveJsonSettings(jsonSettings);
        await thunk(dispatch, getState, extra);
        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);
        const [ start, end ] = calls;
        expect(start[0].type).toBe(responsePending);
        expect(end[0].type).toBe(responseRejected);
    });

    test('Должен давать статус pending', async () => {
        (getUserAuthData as jest.Mock).mockReturnValue(userData);
        const thunk = saveJsonSettings(jsonSettings);
        await thunk(dispatch, getState, extra);
        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);
        const [ start, end ] = calls;
        expect(start[0].type).toBe(responsePending);
        // expect(end[0].type).toBe(responseFulfilled);
    })
});