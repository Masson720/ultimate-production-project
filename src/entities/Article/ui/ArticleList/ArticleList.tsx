import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss"
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { memo } from "react";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";


interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
}

const getSkeletons = (view: ArticleView) => {
    return (
        new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton 
                key={index} 
                view={view}
                className={cls.card}
            />
        ))
    )
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL
    } = props;

    if(isLoading){
        return (
            <div className={classNames(cls.ArticleList)}>
                {getSkeletons(view)}
            </div>
        )
    }

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem 
                article={article} 
                className={cls.card}
                key={article.id}
                view={view}
            />
        )
    }

    return (
        <div className={classNames(cls.ArticleList)}>
            {articles.length > 0 
                ? articles.map(renderArticle)
                : null
            }
        </div>
    )
})