import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { getLoginUsername } from "./getLoginUsername";

describe('getLoginPassword test', () => {
    test('should return name', () => {
        const state: DeepPartial<StateSchema> ={
            loginForm: {
                username: 'name'
            }
        }
        expect(getLoginUsername(state as StateSchema)).toEqual('name');
    })
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    })
})