import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile";
import { validateRegistrationData } from "../validateRegistrationData/validateRegistrationData";
import { ValidateRegistrationErrors } from "../../consts/consts";
import { getProfileForm, getUserData } from "../../selectors/registrationSelectors";

 
export const registrationUserData = createAsyncThunk<Profile, void, ThunkConfig<ValidateRegistrationErrors[]>>(
    'registrationUserData',
    async (_, thunkApi) => {
        const {
            extra, 
            rejectWithValue,
            getState
        } = thunkApi;
        
        const profile = getProfileForm(getState());
        const user = getUserData(getState())
        const errors = validateRegistrationData(profile, user);

        if(errors.length){
            return rejectWithValue(errors)
        }

        try {
            const response = await extra.api.post<Profile>(`/register`, {profile, user});
            if(!response.data){
                throw new Error();
            }
            console.log(response.data);
            return response.data;
        } catch(e) {
            console.log(e);
            return rejectWithValue([ValidateRegistrationErrors.SERVER_ERROR]);
        }
    }
);