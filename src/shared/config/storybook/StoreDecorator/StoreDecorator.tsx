import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { profileReducer } from 'entities/Profile';
import { AddCommentFormReducer } from 'features/AddCommentForm/model/slice/addCommentFormSlice';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice';
import { ReducersList } from 'shared/lib/components/DynamicModule/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer, 
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: AddCommentFormReducer,
    articleDetailsComments: articleDetailsCommentsReducer
}
 
export const StoreDecorator = (
        state : DeepPartial<StateSchema>, 
        asyncReducers?: ReducersList 
    ) => (Story: StoryFn) => (
    <StoreProvider initialState={state} asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}>
        <Story/>       
    </StoreProvider> 
); 