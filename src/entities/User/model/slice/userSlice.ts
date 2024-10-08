import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/features';
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData/initAuthData';


const initialState: UserSchema = {
    _inited: false,
    authData: undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            setFeatureFlags(action.payload.features);
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                action.payload.id
            );
            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                action.payload.features?.isAppRedesigned ? 'new' : 'old'
            )
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveJsonSettings.fulfilled, (state, {payload}: PayloadAction<JsonSettings>) => {
                if(state.authData){
                    state.authData.jsonSettings = payload;
                }
                
        });
        builder
            .addCase(initAuthData.fulfilled, (state, {payload}: PayloadAction<User>) => {
                state.authData = payload;
                setFeatureFlags(payload.features);
                state._inited  = true;
        });
        builder
            .addCase(initAuthData.rejected, (state) => {
                if(state.authData){
                    state._inited  = false;
                }
        });
    }   
})

export const { actions: userActions  } = userSlice;
export const { reducer: userReducer  } = userSlice;