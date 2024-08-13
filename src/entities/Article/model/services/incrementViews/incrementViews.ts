import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getUserAuthData } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleForm } from "../../types/AddArticleFormSchema";


export const incrementViews = createAsyncThunk<any, ArticleForm, ThunkConfig<string>>(
    'article/incrementViews',
    async (
        article,
        thunkApi
    ) => {
        const {
            getState,
            extra,
            rejectWithValue
        } = thunkApi;
        
        const userData = getUserAuthData(getState());
        const articleId = article?.id;
        const updateArticle = {...article, views: article.views + 1}
        
        if(!userData){
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.put<ArticleForm>(`/articles/${articleId}`, updateArticle);
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