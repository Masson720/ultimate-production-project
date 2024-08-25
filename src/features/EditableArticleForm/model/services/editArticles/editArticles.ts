import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getUserAuthData } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "@/entities/Article";
import { ArticleForm } from "../../types/AddArticleFormSchema";
import { validateArticle } from "../validateArticle/validateArticle";
import { ValidateErrors } from "../../consts/validateTypes";


export const editArticle = createAsyncThunk<any, ArticleForm, ThunkConfig<ValidateErrors[]>>(
    'editArticle',
    async (
        formData,
        thunkApi
    ) => {
        const {
            getState,
            extra,
            rejectWithValue
        } = thunkApi;

        const userData = getUserAuthData(getState());
        const articleId = formData?.id;
        const errors = validateArticle(formData)

        if(!userData){
            return rejectWithValue([ValidateErrors.SERVER_ERROR]);
        }
        if(errors.length){
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put<Article>(`/articles/${articleId}`, formData);
            if(!response.data){
                throw new Error();
            }
            console.log(response)
            return response.data
        } catch(e){
            console.log(e)
            return rejectWithValue([ValidateErrors.SERVER_ERROR]);
        }
    }
)