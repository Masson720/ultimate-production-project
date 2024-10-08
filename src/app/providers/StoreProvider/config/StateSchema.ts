import { Action, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { UserSchema } from "@/entities/User";
import { LoginSchema } from "@/features/AuthByUsername";
import { ArticleDetailsSchema } from "@/entities/Article";
import { AddCommentFormSchema } from "@/features/AddCommentForm";
import { ArticlesPageSchema } from "@/pages/ArticlesPage";
import { UISchema } from "@/features/ScrollSave";
import { ArticleDetailsPageSchema } from "@/pages/ArticleDetailsPage";
import { rtkApi } from "@/shared/api/rtkApi";
import { ProfileSchema } from "@/features/editableProfileCard";
import { RegistrationSchema } from "@/features/RegistrationUser";
import { AddArticleFormSchema } from "@/features/EditableArticleForm";

export interface StateSchema {
    user: UserSchema
    ui: UISchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    //Асинхронные редюсеры
    loginForm: LoginSchema | undefined
    registrationForm: RegistrationSchema | undefined
    profile: ProfileSchema | undefined
    articleDetails: ArticleDetailsSchema | undefined
    addCommentForm: AddCommentFormSchema | undefined
    addArticleForm: AddArticleFormSchema | undefined
    articlesPage: ArticlesPageSchema | undefined
    articleDetailsPage: ArticleDetailsPageSchema | undefined
}


export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: Action) => StateSchema
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
    getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
     reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}