import { CommentList } from "@/entities/Comment";
import { AddCommentForm } from "@/features/AddCommentForm";
import { getArticleCommentsIsLoading } from "@/pages/ArticleDetailsPage/model/selectors/commentsSelector";
import { addCommentForArticle } from "@/pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "@/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleComments } from "@/pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice";
import { Suspense, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { Text} from '@/shared/ui/redesigned/Text/Text';
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Loader } from "@/shared/ui/deprecated/Loader/Loader";
import { ToggleFeatures } from "@/shared/features";

interface ArticleDetailsCommentsProps {
    className?: string
    id?: string
}

export const ArticleDetailsComments = (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;

    const { t } = useTranslation('article');
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, []);

    return (
        <VStack gap='16' max>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <TextDeprecated
                        size={TextSize.L} 
                        title={t('Комментарии')} 
                    />
                }
                on={
                    <Text 
                        size='l' 
                        title={t('Комментарии')} 
                    />
                }
            /> 
            <Suspense fallback={<Loader/>}>
                <AddCommentForm onSendComment={onSendComment}/>
            </Suspense>
            <CommentList 
                comments={comments}
                isLoading={commentsIsLoading} 
            />
        </VStack>
    )
}
