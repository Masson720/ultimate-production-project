import { ArticleDetails } from "entities/Article";
import { CommentList } from "entities/Comment";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom";
import { Text } from "shared/ui/Text/Text";
import cls from './ArticleDetailsPage.module.scss';
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModule/DynamicModuleLoader";
import { articleDetailsCommentsReducer, getArticleComments } from "pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice";
import { useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "pages/ArticleDetailsPage/model/selectors/commentsSelector";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchCommentsByArticleId } from "pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AddCommentForm } from "features/AddCommentForm";
import { addCommentForArticle } from "pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle";

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDetailsPage = () => {
    const { id } = useParams<{id: string}>();
    const {t} = useTranslation('article');
    const comments = useSelector(getArticleComments.selectAll); 
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });


    if(!id) {
        return (
            <div>
                {t('Статья не найдена')}
            </div>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div>
                <ArticleDetails id={id}/>
                <Text title={t('Комментарии')} className={cls.commentTitle}/>
                <AddCommentForm onSendComment={onSendComment}/>
                <CommentList 
                    comments={comments}
                    isLoading={commentsIsLoading} 
                />
            </div> 
        </DynamicModuleLoader>

    )
}

export default memo(ArticleDetailsPage);