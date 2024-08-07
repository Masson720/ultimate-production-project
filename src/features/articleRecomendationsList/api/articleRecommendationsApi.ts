import { Article } from "@/entities/Article";
import { rtkApi } from "@/shared/api/rtkApi";

const recomendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                    _expand: 'user'
                }
            }),
        }),
    }),
})

export const useArticleRecomendationsList = recomendationsApi.useGetRecommendationsListQuery;