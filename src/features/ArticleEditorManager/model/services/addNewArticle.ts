import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article } from "@/entities/Article";
import { getUserAuthData } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFormData } from "../selectors/addArticleFormSelectors";
import { ArticleForm } from "../types/AddArticleFormSchema";


export const addNewArticle = createAsyncThunk<any, ArticleForm, ThunkConfig<string>>(
    'addCreatePage/addNewewArticle',
    async (
        article,
        thunkApi
    ) => {
        const {
            getState,
            extra,
            rejectWithValue,
            dispatch
        } = thunkApi;

        const userData = getUserAuthData(getState());
        const formData = getFormData(getState());

        if(!userData){
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<Article>('/articles', formData);
            if(!response.data){
                throw new Error();
            }
            console.log(response.data);
            return response.data
        } catch(e){
            console.log(e)
            return rejectWithValue('error');
        }

    }
)