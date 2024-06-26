import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "@/entities/Country"; 
import { Currency } from "@/entities/Currency";
import { updateProfileData } from "./updateProfileData";
import { ValidateProfileErrors } from "../../consts/consts";

const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'admin',
    city: 'Moscow',
    currency: Currency.RUB,
    id: '1'
}


describe('updateProfileData test', () => {

    test('success ', async () => {
    
        const thunk = new TestAsyncThunk(
            updateProfileData, {
                profile: {
                    form: data 
                }
            });
        thunk.api.put.mockReturnValue(Promise.resolve({data: data}));
        const result = await thunk.callThunk();
    })
    test('error', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData, {
                profile: {
                    form: data 
                }
            });
        thunk.api.put.mockReturnValue(Promise.resolve({status: 403}));
        const result = await thunk.callThunk();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileErrors.SERVER_ERROR 
        ]);
    });
    test('validate error', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData, {
                profile: {
                    form: {...data, lastname: ''} 
                }
            });
        const result = await thunk.callThunk();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileErrors.INCORRECT_USER_DATA 
        ]);
    });
}) 