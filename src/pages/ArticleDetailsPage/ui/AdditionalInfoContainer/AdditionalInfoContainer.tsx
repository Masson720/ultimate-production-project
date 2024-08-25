import { getArticleDetailsData } from "@/entities/Article";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { ArticleAdditionalInfo } from "@/widgets/ArticleAdditionalInfo";
import cls from './AdditionalInfoContainer.module.scss';
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useNavigate } from "react-router-dom";
import { getRouteArticleEdit, getRouteArticles } from "@/shared/const/router";
import { getUserAuthData } from "@/entities/User";
import { DeleteArticleModal } from "@/features/DeleteArticleModal";

interface AdditionalInfoContainerProps {
    className?: string
}

export const AdditionalInfoContainer = memo((props: AdditionalInfoContainerProps) => {
    const {
        className
    } = props;
    const article = useSelector(getArticleDetailsData);
    const navigate = useNavigate();
    const user = useSelector(getUserAuthData);
    const [ onOpenModal, setOnOpenModal ] = useState(false);
    const onBackToList = useCallback(()=> {
        navigate(getRouteArticles())
    }, [navigate]);

    const onEditArticle = useCallback(()=> {
        if(article){
            navigate(getRouteArticleEdit(article.id))
        }
    }, [navigate, article])

    const onOpenDeleteModal = useCallback(() => {
        setOnOpenModal(true);
    }, [onOpenModal]);

    const onCloseDeleteModal = useCallback(() => {
        setOnOpenModal(false);
    }, [onOpenModal])

    if(!article){
        return null;
    }

    return (
        <Card padding="24" borderRadius='round' className={classNames(cls.card, {}, [className])}>
            {onOpenModal && <DeleteArticleModal articleId={article.id} isOpen={onOpenModal} onClose={onCloseDeleteModal}/>}
            <ArticleAdditionalInfo
                id={user?.id}
                onEdit={onEditArticle}
                onBackToList={onBackToList}
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
                onDelete={onOpenDeleteModal}
            /> 
        </Card>
    )
})