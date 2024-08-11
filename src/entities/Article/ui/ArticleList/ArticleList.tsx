import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss"
import { Article } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "@/shared/ui/deprecated/Text/Text";
import { useTranslation } from "react-i18next";
import { ArticleView } from "../../model/consts/articleConsts";
import { ToggleFeatures } from "@/shared/features";
import { HStack } from "@/shared/ui/redesigned/Stack";

interface ArticleListProps {
    className?: string
    articles?: Article[]
    isLoading?: boolean
    target?: HTMLAttributeAnchorTarget
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
        target,
        isLoading,
        view = ArticleView.SMALL,
    } = props;
    const {t} = useTranslation('article');

    if(!isLoading && !articles?.length){
        return (
            <div className={classNames(cls.ArticleList, {}, [className])}>
                <Text 
                    size={TextSize.L} 
                    title={t('Статьи не найдены')} 
                />
            </div>
        )
    }

    return (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    off={
                        <div 
                            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
                            data-testid={'ArticleList'}
                        >
                        {
                            articles?.map(item => (
                                <ArticleListItem 
                                    article={item}
                                    target={target}
                                    className={cls.card}
                                    view={view}
                                    key={item.id}
                                />
                            ))
                        }
                            {isLoading && getSkeletons(view)}                     
                        </div>                        
                        }
                    on={
                        <HStack
                            gap='16'
                            wrap="wrap"
                            className={classNames(cls.ArticleListRedesigned, {}, [])}
                            data-testid={'ArticleList'}
                        >
                            {
                                articles?.map(item => (
                                    <ArticleListItem 
                                        article={item}
                                        target={target}
                                        className={cls.card}
                                        view={view}
                                        key={item.id}
                                    />
                                ))
                            }
                            {isLoading && getSkeletons(view)}                     
                        </HStack>                        
                    }
                />

    )
})