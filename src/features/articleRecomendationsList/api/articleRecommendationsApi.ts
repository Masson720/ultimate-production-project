import { rtkApi } from "shared/api/rtkApi";

const recomendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getRecommendationsList: build.query({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit
                }
            }),
        }),
    }),
})

export const useArticleRecomendationsList = recomendationsApi.useGetRecommendationsListQuery;