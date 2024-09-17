import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article } from "@/entities/Article";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFormData } from "../../selectors/addArticleFormSelectors";
import { getUserAuthData } from "@/entities/User";
import { ArticleForm } from "../../types/AddArticleFormSchema";
import { validateArticle } from "../validateArticle/validateArticle";
import { ValidateErrors } from "../../consts/validateTypes";


export const addNewArticle = createAsyncThunk<ArticleForm, void, ThunkConfig<Array<ValidateErrors>>>(
    'addCreatePage/addNewewArticle',
    async (
        _,
        thunkApi
    ) => {
        const {
            getState,
            extra,
            rejectWithValue
        } = thunkApi;

        const userData = getUserAuthData(getState());
        const formData = getFormData(getState());
        const errors = validateArticle(formData)

        if(!userData){
            return rejectWithValue([ValidateErrors.SERVER_ERROR]);
        }
        if(errors.length){
            return rejectWithValue(errors);
        }

        try {
            console.log('Before API call');
            const response = await extra.api.post<Article>('/articles', {...formData, userId: userData.id});
            if(!response.data){
                return rejectWithValue([ValidateErrors.SERVER_ERROR]);
            }
            return response.data
        } catch(e){
            console.log(e)
            return rejectWithValue([ValidateErrors.SERVER_ERROR]);
        }

    }
)