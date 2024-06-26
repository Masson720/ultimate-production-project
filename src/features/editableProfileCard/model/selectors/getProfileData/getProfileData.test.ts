import { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileData } from "./getProfileData";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";

describe('getProfileData test', () => {
    test('should return error ', () => {

        const data = {
            username: 'admin',
            age: 22,
            country: Country.Ukraine,
            lastname: 'ulbi tv',
            first: 'admin',
            city: 'Moscow',
            currency: Currency.RUB,
        }
        const state: DeepPartial<StateSchema> = {
            profile: {
                data
            }
        }
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });

    test('shoul work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    })
})