import { loginByUsername } from "../services/loginByUsername/loginByUsername";
import { LoginSchema } from "../types/loginSchema";
import { loginActions, loginReducer } from "./loginSlice";

describe('loginSlice test', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = {username: '123'};
        expect(loginReducer(state as LoginSchema, loginActions.setUsername('123'))).toEqual({username: '123'});
    })
    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {password: '123'};
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('123'))).toEqual({password: '123'});
    })
})

describe('loginSlice extraReducers test', () => {

    const initialState = {
        isLoading: false,
        username: '',
        password: '',
        error: undefined
      };

    test('isLoading должно быть true при loginByusername.pending', () => {
        const action = { type: loginByUsername.pending.type }
        const newState = loginReducer(initialState, action);
        expect(newState.isLoading).toBe(true);
        expect(newState.error).toBeUndefined();
    })

    test('isLoading должно быть false при loginByusername.fulfilled', () => {
        const action = { type: loginByUsername.fulfilled.type }
        const newState = loginReducer(initialState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.error).toBeUndefined();
    })

    test('isLoading должен быть false и должна быть ошибка в loginByUsername.rejected', () => {
        const action = {
            type: loginByUsername.rejected.type,
            payload: 'Error message'
        }
        const newState = loginReducer(initialState, action)
        expect(newState.isLoading).toBe(false);
        expect(newState.error).toBe('Error message');
    })

})