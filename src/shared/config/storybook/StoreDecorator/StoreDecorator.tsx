import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
import { AddCommentFormReducer } from '@/features/AddCommentForm/model/slice/addCommentFormSlice';
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
import { ReducersList } from '@/shared/lib/components/DynamicModule/DynamicModuleLoader';
import { AddArticleFormReducer } from '@/entities/Article';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: AddCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
    addArticleForm: AddArticleFormReducer
}
 
export const StoreDecorator = (
        state : DeepPartial<StateSchema>, 
        asyncReducers?: ReducersList 
    ) => (Story: StoryFn) => (
    <StoreProvider 
        initialState={state} 
        asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}
    >
        <Story/> 
    </StoreProvider> 
); 