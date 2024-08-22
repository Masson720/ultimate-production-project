import { Article } from "@/entities/Article";
import { ValidateErrors } from "../consts/validateTypes";

type AddArticle = Omit<Article, 'user'>

export interface ArticleForm extends AddArticle {
    userId?: string
}


export interface AddArticleFormSchema {
    articleForm: ArticleForm
    success: boolean
    isLoading?: boolean
    errors?: string[]
}
