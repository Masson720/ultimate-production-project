import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getArticleDetailsData } from "@/entities/Article/model/selector/articleDetailsSelectors";
import { getCanEditArticle } from "@/pages/ArticleDetailsPage/model/selectors/articleSelectors";
import { HStack } from "@/shared/ui/Stack";
import { RoutePath } from "@/shared/const/router";


export const ArticleDetailsPageHeader = memo(() => {
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
        <HStack max justify="between">
            <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && 
                <Button 
                    theme={ThemeButton.OUTLINE}
                    onClick={onEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            }
        </HStack>
    )
})
