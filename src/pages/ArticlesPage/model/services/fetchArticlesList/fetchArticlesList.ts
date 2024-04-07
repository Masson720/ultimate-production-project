import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { getArticlesPageLimit } from "../../selectors/articlesPageSelectors";

interface FetchArticleListProps {
    page?: number
}

 export const fetchArticlesList  = createAsyncThunk<Article[], FetchArticleListProps, ThunkConfig<string>>(
    'articlePage/fetchCommentsByArticleId',
    async (props, thunkApi) => {
        const {
            page = 1 
        } = props;
        const {
            extra, 
            rejectWithValue,
            getState
        } = thunkApi;
        const limit = getArticlesPageLimit(getState())

        try {
            const response = await extra.api.get<Article[]>(`/articles`, {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page
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