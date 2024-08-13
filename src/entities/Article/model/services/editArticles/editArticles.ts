import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getUserAuthData } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleForm } from "../../types/AddArticleFormSchema";


export const editArticle = createAsyncThunk<any, ArticleForm, ThunkConfig<string>>(
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

        if(!userData){
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.put<ArticleForm>(`/articles/${articleId}`, formData);
            if(!response.data){
                throw new Error();
            }
            return response.data
        } catch(e){
            console.log(e)
            return rejectWithValue('error');
        }
    }
)