import {
    createEntityAdapter,
    createSlice, 
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleDetailsRecomendationsSchema } from '../types/ArticleDetailsRecomendationsSchema';
import { Article } from '@/entities/Article';
import { fetchArticlesRecomendations } from '../services/fetchArticleRecomendations/fetchArticleRecomendations';


const recomendationAdapter = createEntityAdapter<Article, string>({
    selectId: ( article ) => article.id,
});

export const getArticleRecomendations  = recomendationAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recomendations || recomendationAdapter.getInitialState()
);

const ArticleDetailsPageRecomendaionsSlice = createSlice({
    name: 'ArticleDetailsPageRecomendaionsSlice',
    initialState: recomendationAdapter.getInitialState<ArticleDetailsRecomendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesRecomendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesRecomendations.fulfilled, (state, action) => {
                state.isLoading = false;
                recomendationAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticlesRecomendations .rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }
});

export const { 
    reducer: articleDetailsRecomendationsReducer 
} = ArticleDetailsPageRecomendaionsSlice;