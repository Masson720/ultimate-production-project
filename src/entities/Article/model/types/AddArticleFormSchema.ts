import { Article } from "@/entities/Article";
import { Errors } from "./articleHooksType";

type AddArticle = Omit<Article, 'user'>

export interface ArticleForm extends AddArticle {
    userId?: string
}

export interface AddArticleFormSchema {
    articleForm: ArticleForm
    success: boolean
    isLoading?: boolean
    validateErrors: Errors
    errors?: string
}
