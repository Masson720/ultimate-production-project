import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleForm } from "../../types/AddArticleFormSchema";

export const deleteArticle = createAsyncThunk<any, string, ThunkConfig<string>>(
    'deleteArticle',
    async (
        articleId,
        thunkApi
    ) => {
        const {
            extra,
            rejectWithValue
        } = thunkApi;

        try {
            const response = await extra.api.delete<ArticleForm>(`/articles/${articleId}`);
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