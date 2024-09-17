import axios from "axios";
import { initAuthData } from "./initAuthData";
import { LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorage";
import { getUserDataByIdQuery } from "@/entities/User/api/userApi";

const localStorageMock = (() => {
    let store: Record<string, string> = {};
    
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value;
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const dispatch = jest.fn();
const unwrapMock = jest.fn();
const rejectWithValue = jest.fn((value) => value);
const getState = jest.fn();
const api = axios;
const extra = { 
    api,
    rejectWithValue
};


describe('entities/User?initAuthData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorageMock.clear();
    });

    test('Тест должен вернуть ошибку "NO_ID, если userId нет в localStorage', async () => {

        const thunk = initAuthData();
        const result = await thunk(dispatch, getState, extra);
        console.log(result);
        expect(result.payload).toBe('NO_ID');
        
        expect(dispatch).toHaveBeenCalledTimes(2);
    });
})