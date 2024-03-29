
import { Country } from "entities/Country";
import { ProfileSchema, ValidateProfileErrors } from "../types/profile";
import { profileActions, profileReducer } from "./profileSlice";
import { Currency } from "entities/Currency";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";

const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'admin',
    city: 'Moscow',
    currency: Currency.RUB,
}

describe('profileSlice test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = {readonly: false};
        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({readonly: true}); 
    });
    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {data, form: {
            username: ''
        }};
        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit()))
        .toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        }); 
    });
    test('test upgrade profile', () => {
        const state: DeepPartial<ProfileSchema> = {form: {
            username: '123'
        }};
        expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({
            username: '12345'
        })))
        .toEqual({
            form: { username: '12345' }
        }); 
    });
    test('test upgrade profile pending service', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileErrors.SERVER_ERROR]
        };
        expect(profileReducer(state as ProfileSchema, updateProfileData.pending))
        .toEqual({
            isLoading: true,
            validateErrors: undefined
        }); 
    });
    test('test upgrade profile service fullfiled', () => {
        const state: DeepPartial<ProfileSchema> = { 
            isLoading: true,
            validateErrors: [ValidateProfileErrors.SERVER_ERROR]
        };
        expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, '')))
        .toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            form: data,
            data,
        }); 
    });
})