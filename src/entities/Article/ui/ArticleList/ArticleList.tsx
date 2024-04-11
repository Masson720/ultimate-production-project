import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss"
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { memo } from "react";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";


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
    const {t} = useTranslation('article');

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

    if(!isLoading && !articles.length){
        return (
            <div className={classNames(cls.ArticleList)}>
                <Text 
                    size={TextSize.L} 
                    title={t('Статьи не найдены')} 
                />
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleList)}>
            {articles.length > 0 
                ? articles.map(renderArticle)
                : null
            }
            {isLoading && getSkeletons(view)}
        </div>
    )
})