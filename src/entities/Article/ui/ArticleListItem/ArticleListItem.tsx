import { Article } from "../../model/types/article";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { ArticleView } from "@/entities/Article/model/consts/articleConsts";
import { ToggleFeatures } from "@/shared/features";
import { ArticleListItemDeprecated } from "./ArticleListItemDeprecated/ArticleListItemDeprecated";
import { ArticleListItemRedesigned } from "./ArticleListItemRedesigned/ArticleListItemRedesigned";
 
export interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleView
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <ArticleListItemDeprecated {...props} />
            }
            on={
                <ArticleListItemRedesigned {...props}/>
            }
        />
    )
})
