import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDetailsPageSchema } from "../types";
import { articleDetailsRecomendationsReducer } from "./articleDetailsPageRecomendationsSlice";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";


export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recomendations: articleDetailsRecomendationsReducer,
    comments: articleDetailsCommentsReducer
})