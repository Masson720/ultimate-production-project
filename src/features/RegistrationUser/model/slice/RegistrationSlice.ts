import { createSlice } from '@reduxjs/toolkit';
import { RegistrationSchema } from '../types/registrationSchema';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { registrationUserData } from '../services/registrationUserData/registrationUserData';
import { Profile } from '@/entities/Profile';
import { UserData } from '../types/registrationTypes';

const profile: Profile = {
    id: '',
    avatar: '',
    first: '',
    lastname: '',
    age: 0,
    currency: Currency.EUR, 
    country: Country.Russia,
    city: '',
    username: ''
}

const user: UserData = {
        username: '',
        password: '',
        id: '',
        roles: ['USER'],
        avatar: '',
        jsonSettings: {
            theme: "app_light_theme",
            isFirstVisit: true,
            settingsPageHasBeenOpen: false,
            isArticlesPageWasOpened: true,
            isArticlePageWasOpened: false
        },
        features: {
            isAppRedesigned: true,
            isCounterEnabled: true,
            isArticleRatingEnabled: true
        }
    }

const initialState: RegistrationSchema = {
    profile: profile,
    user: user,
    validateErrors: undefined,
    isLoading: false,
    isSuccess: false,
    errors: undefined
}

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.profile.first = action.payload;
        },
        setLastName: (state, action) => {
            state.profile.lastname = action.payload;
        },
        setAge: (state, action) => {
            state.profile.age = action.payload;
        },
        setCurrency: (state, action) => {
            state.profile.currency = action.payload;
        },
        setCountry: (state, action) => {
            state.profile.country = action.payload;
        },
        setCity: (state, action) => {
            state.profile.city = action.payload;
        },
        setUsername: (state, action) => {
            state.profile.username = action.payload;
            state.user.username = action.payload
        },
        setAvatar: (state, action) => {
            state.profile.avatar = action.payload;
            state.user.avatar = action.payload;
        },
        setPassword: (state, action) => {
            state.user.password = action.payload;
        },
        setResetForm: (state) => {
            state.user = user;
            state.profile = profile;
            state.isSuccess = false;
            state.validateErrors = undefined;
            state.errors = undefined;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationUserData.pending ,(state) => {
                state.isLoading = true;
            })
            .addCase(registrationUserData.fulfilled ,(state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(registrationUserData.rejected ,(state, action) => {
                state.validateErrors = action.payload;
            })
    }
})

export const { actions: registrationActions } = registrationSlice;
export const { reducer: registrationReducer } = registrationSlice;