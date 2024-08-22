import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article } from "@/entities/Article";
import { ValidateErrors } from "../../consts/validateTypes";

 export const fetchArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string[]>>(
    'editArticleForm/fetchArticleById',
    async (articleId, thunkApi) => {
        const {
            extra, 
            rejectWithValue
        } = thunkApi;

        try {
            if(!articleId){
                throw new Error('No id')
            }
            const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                params: {
                    _expand: 'user'
                }
            });
            if(!response){
                throw new Error();
            }
            return response.data;
        } catch(e) {
            console.log(e);
            return rejectWithValue([ValidateErrors.SERVER_ERROR]);
        }
    }
);