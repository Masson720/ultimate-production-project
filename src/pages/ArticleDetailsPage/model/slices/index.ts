import { combineReducers } from "@reduxjs/toolkit";
import { articleDetailsRecomendationsReducer } from "./articleDetailsPageRecomendationsSlice";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";


export const articleDetailsPageReducer = combineReducers({
    recomendations: articleDetailsRecomendationsReducer, 
    comments: articleDetailsCommentsReducer
})