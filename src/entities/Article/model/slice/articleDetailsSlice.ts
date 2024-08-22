import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { deleteArticle } from '../services/deleteArticle/deleteArticle';
import { editArticle } from '@/features/EditableArticleForm/model/services/editArticles/editArticles';

const initialState: ArticleDetailsSchema = {
    isLoading: true,
    error: undefined,
    data: undefined
}

export const articleDetailsSlice = createSlice({
    name: 'articleDetails', 
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(deleteArticle.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteArticle.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }
})

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;