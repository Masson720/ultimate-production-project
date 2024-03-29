import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { validateProfileData } from "./validateProfileData";
import { ValidateProfileErrors } from "../../types/profile";

const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'admin',
    city: 'Moscow',
    currency: Currency.RUB,
}


describe('validateProfileData test', () => {

    test('success ', async () => {
    
        const result = validateProfileData(data);
 
        expect(result).toEqual([]);
    });
    test('without first and last name ', async () => {
        
        const result = validateProfileData({...data, first: '', lastname: ''});
 
        expect(result).toEqual([
            ValidateProfileErrors.INCORRECT_USER_DATA 
        ]);
    });

    test('incorrect age', async () => {
        
        const result = validateProfileData({...data, age: undefined});
 
        expect(result).toEqual([
            ValidateProfileErrors.INCORRECT_AGE
        ]);
    });
    test('without country', async () => {
        
        const result = validateProfileData({...data, country: undefined});
 
        expect(result).toEqual([
            ValidateProfileErrors.INCORRECT_COUNTRY
        ]);
    }); 
    test('without all', async () => {
        
        const result = validateProfileData({});
 
        expect(result).toEqual([      
            ValidateProfileErrors.INCORRECT_USER_DATA,  
            ValidateProfileErrors.INCORRECT_AGE,
            ValidateProfileErrors.INCORRECT_COUNTRY,
        ]);
    }); 
})