import { Profile } from "@/entities/Profile";
import { UserData } from "../../types/registrationTypes";
import { ValidateRegistrationErrors } from "../../consts/consts";



export function validateRegistrationData(profileData?: Profile, userData?: UserData){
    if(!userData || !profileData){
        return [ValidateRegistrationErrors.NO_DATA];
    }
    const { first, lastname, age, city, username } = profileData;
    const { password } = userData;
    const errors = [];

    if(first === ''){
        errors.push(ValidateRegistrationErrors.INCORRECT_FIRSTNAME)
    }
    if(lastname === ''){
        errors.push(ValidateRegistrationErrors.INCORRECT_LASTNAME)
    }
    if(!Number.isInteger(age) || !age){
        errors.push(ValidateRegistrationErrors.INCORRECT_AGE);
    }
    if(city === ''){
        errors.push(ValidateRegistrationErrors.INCORRECT_CITY)
    }
    if(username === ''){
        errors.push(ValidateRegistrationErrors.INCORRECT_USERNAME)
    }
    if(password.length > 8){
        errors.push(ValidateRegistrationErrors.SHORT_PASSWORD)
    }

    return errors;
}