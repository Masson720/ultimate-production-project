import { useCallback } from "react";
import cls from './ArticleDetailsPageHeader.module.scss';
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/RouteConfig";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { getArticleDetailsData } from "entities/Article/model/selector/articleDetailsSelectors";
import { getCanEditArticle } from "pages/ArticleDetailsPage/model/selectors/articleSelectors";


export const ArticleDetailsPageHeader = () => {
    const {t} = useTranslation('article');
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [navigate]);

    return (
        <div className={cls.ArticleDetailsPageHeader}>
            <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && 
                <Button 
                    theme={ThemeButton.OUTLINE} 
                    className={cls.editBtn}
                    onClick={onEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            }
        </div>
    )
}
