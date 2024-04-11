import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";


 export const fetchArticlesRecomendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articleDetailsPage/fetchArticlesRecomendations',
    async (_, thunkApi) => {
        const {extra, rejectWithValue } = thunkApi; 

        try {
            const response = await extra.api.get<Article[]>(`/articles`, {
                params: {
                    _limit: 4
                }
            });
            if(!response){
                throw new Error();
            }
            return response.data;
        } catch(e) {
            console.log(e);
            return rejectWithValue('error');
        }
    }
);