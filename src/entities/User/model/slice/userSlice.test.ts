import { LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorage";
import { User, UserSchema } from "../types/user";
import { userActions, userReducer } from "./userSlice";
import { saveJsonSettings } from "../services/saveJsonSettings/saveJsonSettings";
import { JsonSettings } from "../types/jsonSettings";
import { Theme } from "@/shared/const/theme";
import { initAuthData } from "../services/initAuthData/initAuthData";

const initialState = {
    authData: {
      id: '123',
      features: {
        isAppRedesigned: true,
      },
      jsonSettings: {},
    },
    _inited: false,
} as UserSchema;

describe('entities/User/userSlice', () => {
    const mockUser = {
        id: 'admin',
        username: '1',
        features: {
            isAppRedesigned: true
        }
    }

    beforeEach(() => {
        localStorage.clear();
    })

    test('Должен задать authData и сохранить его в LocalStorage', () => {
        const state = userReducer(undefined, userActions.setAuthData(mockUser));
        expect(state.authData).toEqual(mockUser);
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe(mockUser.id);
        expect(localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY)).toBe('new');
    })

    test('Должен очистить authData и удалить все из localStorage', () => {

          const state = userReducer(initialState, userActions.logout());

          expect(state.authData).toBeUndefined();
          expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBeNull();
    })
});

describe('entities/User/userSlice extraReducers', () => {
    const mockUser = {
        id: '1',
        username: 'admin',
        features: {
            isAppRedesigned: true
        }
    }

    test('saveJsonSettings должен получить и задать jsonSettings в authData', () => {
        const newSettings: JsonSettings = {
            theme: Theme.DARK,
        };
        const action = { 
            type: saveJsonSettings.fulfilled.type,
            payload: newSettings
        }
        const newState = userReducer(initialState, action);
        expect(newState.authData?.jsonSettings).toEqual(newSettings);
    });

    test('Должен задать authData при initAuthData.fulfilled', () => {
        const action = { 
            type: initAuthData.fulfilled.type,
            payload: mockUser
        }

        const newState = userReducer(initialState, action);
        expect(newState.authData).toEqual(mockUser);
        expect(newState._inited).toBe(true);
    });

    test('Должен задать для _inited false при initAuthData.rejected', () => {

        const action = { type: initAuthData.rejected.type }
        const newState = userReducer(initialState, action);
        expect(newState._inited).toBe(false);
    })
})