import { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginState } from "./getLoginState";

const loginForm = {
    password: '12345',
    isLoading: false,
    error: '',
    username: 'User'
}


describe('features/AuthByUsername/selectors/getLoginState', () => {
    test('Должен вернуть LoginForm', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm
        }
        expect(getLoginState(state as StateSchema)).toEqual(loginForm);
    })

    test('Должен вернуть пустой state', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {}
        }
        expect(getLoginState(state as StateSchema)).toEqual({});
    })
})
