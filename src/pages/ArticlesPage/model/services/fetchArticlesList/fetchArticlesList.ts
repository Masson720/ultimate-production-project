import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article, ArticleType } from "@/entities/Article";
import { 
    getArticlesPageLimit, 
    getArticlesPageNum, 
    getArticlesPageOrder, 
    getArticlesPageSearch, 
    getArticlesPageSort, 
    getArticlesPageType 
} from "../../selectors/articlesPageSelectors";
import { addQueryParams } from "@/shared/lib/url/addQueryParams/addQueryParams";

interface FetchArticleListProps {
    replace?: boolean
}

 export const fetchArticlesList  = createAsyncThunk<Article[], FetchArticleListProps, ThunkConfig<string>>(
    'articlePage/fetchCommentsByArticleId',
    async (_, thunkApi) => {
        const {extra, rejectWithValue,getState} = thunkApi;
        const limit = getArticlesPageLimit(getState());
        const sort = getArticlesPageSort(getState());
        const order = getArticlesPageOrder(getState());
        const search = getArticlesPageSearch(getState());
        const page = getArticlesPageNum(getState());
        const type = getArticlesPageType(getState());

        try {
            addQueryParams({sort, order, search, type}); 
            const response = await extra.api.get<Article[]>(`/articles`, {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    type: type === ArticleType.ALL ? undefined : type,
                    _sort: sort,
                    _order: order,
                    q: search,
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