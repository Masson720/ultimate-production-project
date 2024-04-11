import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { SortOrder } from "shared/types";
import { ArticleSortField } from "entities/Article";

 export const initArticlesPage  = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlePage/initArticlesPage',
    async (searchParams, thunkApi) => {
        const {
            getState,
            dispatch
        } = thunkApi;
        dispatch(articlesPageActions.initState());
        const inited = getArticlesPageInited(getState())
        if(inited){
            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticleSortField;
            const searchFromUrl = searchParams.get('sort');

            if(orderFromUrl){
                dispatch(articlesPageActions.setOrder(orderFromUrl));
            }
            if(sortFromUrl){
                dispatch(articlesPageActions.setSort(sortFromUrl));
            }
            if(searchFromUrl){
                dispatch(articlesPageActions.setSearch(searchFromUrl));
            }

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));             
        }
    }
);