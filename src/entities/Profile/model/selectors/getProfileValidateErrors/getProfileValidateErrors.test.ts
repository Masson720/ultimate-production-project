import { StateSchema } from "app/providers/StoreProvider";
import { ValidateProfileErrors } from "../../types/profile";
import { getProfileValidateErrors } from "./getProfileValidateErrors";

describe('getProfileValidateErrors test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: [
                    ValidateProfileErrors.SERVER_ERROR,
                    ValidateProfileErrors.INCORRECT_AGE
                ]
            }
        }
        expect(getProfileValidateErrors(state as StateSchema)).toEqual([
            ValidateProfileErrors.SERVER_ERROR,
            ValidateProfileErrors.INCORRECT_AGE
        ]);
    });

    test('shoul work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined); 
    })
})