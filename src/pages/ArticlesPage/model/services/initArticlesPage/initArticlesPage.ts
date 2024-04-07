import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

 export const initArticlesPage  = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlePage/initArticlesPage',
    async (_, thunkApi) => {
        const {
            getState,
            dispatch
        } = thunkApi;
        dispatch(articlesPageActions.initState());
        const inited = getArticlesPageInited(getState())
        if(inited){
            dispatch(fetchArticlesList({
                page: 1
            }));             
        }
    }
);