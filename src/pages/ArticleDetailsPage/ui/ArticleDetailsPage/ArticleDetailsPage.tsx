import { ArticleDetails, ArticleList } from "entities/Article";
import { CommentList } from "entities/Comment";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom";
import { Text, TextSize } from "shared/ui/Text/Text";
import cls from './ArticleDetailsPage.module.scss';
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModule/DynamicModuleLoader";
import { articleDetailsCommentsReducer, getArticleComments } from "pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice";
import { useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "../../model/selectors/commentsSelector";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AddCommentForm } from "features/AddCommentForm"; 
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/RouteConfig";
import { Page } from "widgets/Page/Page";
import {  getArticleRecomendations } from "../../model/slices/articleDetailsPageRecomendationsSlice";
import { getArticleRecomendationsIsLoading } from "../../model/selectors/recomendationsSelectors";
import { fetchArticlesRecomendations } from "../../model/services/fetchArticleRecomendations/fetchArticleRecomendations";
import { articleDetailsPageReducer } from "../../model/slices";

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = () => {
    const { id } = useParams<{id: string}>();
    const {t} = useTranslation('article');
    const comments = useSelector(getArticleComments.selectAll);
    const recomendations = useSelector(getArticleRecomendations.selectAll)
    const recomendationsIsLoading = useSelector(getArticleRecomendationsIsLoading);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticlesRecomendations());
    }, []);


    if(!id) {
        return (
            <div>
                {t('Статья не найдена')}
            </div>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page>
                <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                    {t('Назад к списку')}
                </Button>
                <ArticleDetails id={id}/>
                <Text 
                    size={TextSize.L} 
                    title={t('Рекомендуем')} 
                    className={cls.commentTitle}
                />
                <Text 
                    size={TextSize.L} 
                    title={t('Комментарии')} 
                    className={cls.commentTitle}
                />
                <ArticleList 
                    articles={recomendations}
                    target={'_blank'}
                    className={cls.recomendations}
                    isLoading={recomendationsIsLoading} 
                /> 
                <AddCommentForm onSendComment={onSendComment}/>
                <CommentList 
                    comments={comments}
                    isLoading={commentsIsLoading} 
                />
            </Page> 
        </DynamicModuleLoader>

    )
}

export default memo(ArticleDetailsPage);