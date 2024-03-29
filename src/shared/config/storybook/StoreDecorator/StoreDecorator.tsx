import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { ReducersList } from 'shared/lib/components/DynamicModule/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer, 
    profile: profileReducer
}
 
export const StoreDecorator = (
        state : DeepPartial<StateSchema>, 
        asyncReducers?: ReducersList 
    ) => (Story: StoryFn) => (
    <StoreProvider initialState={state} asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}>
        <Story/>       
    </StoreProvider> 
); 