import { getArticleDetailsData } from "@/entities/Article";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { ArticleAdditionalInfo } from "@/widgets/ArticleAdditionalInfo";
import cls from './AdditionalInfoContainer.module.scss';
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useNavigate } from "react-router-dom";
import { getRouteArticleEdit, getRouteArticles } from "@/shared/const/router";

interface AdditionalInfoContainerProps {
    className?: string
}

export const AdditionalInfoContainer = memo((props: AdditionalInfoContainerProps) => {
    const {
        className
    } = props;
    const article = useSelector(getArticleDetailsData);
    const navigate = useNavigate();
    const onbackToList = useCallback(()=> {
        navigate(getRouteArticles())
    }, [navigate]);
    const onEditArticle = useCallback(()=> {
        if(article){
            navigate(getRouteArticleEdit(article.id))
        }
    }, [navigate, article])

    if(!article){
        return null;
    }

    return (
        <Card padding="24" border='round' className={classNames(cls.card, {}, [className])}>
            <ArticleAdditionalInfo
                onEdit={onEditArticle}
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
            /> 
        </Card>
    )
})