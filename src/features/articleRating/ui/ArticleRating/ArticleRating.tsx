import { RatingCard } from "@/entities/Rating";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from "@/entities/User";
import { useSelector } from "react-redux";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton/Skeleton";

export interface ArticleRatingProps {
    className?: string
    articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const {
        className,
        articleId
    } = props;

    const {t} = useTranslation();
    const userData = useSelector(getUserAuthData)
    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? ''
    });

    const [rateArticleMutation] = useRateArticle()

    const handlerRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try{
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback
            })
        }catch(e){
            console.log(e);
        }
    }, [articleId, rateArticleMutation, userData?.id]);

    const onCancel = useCallback((starsCount: number) => {
        handlerRateArticle(starsCount);
    }, [handlerRateArticle]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handlerRateArticle(starsCount, feedback);
    }, [handlerRateArticle]);

    if(isLoading){
        return <Skeleton width='100%' height={120} />
    }

    const rating = data?.[0];

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            className={className}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте свой отзыв о статье, это поможет улучшить качество')}
            rate={rating?.rate}
            hasFeedback
        />  
    )
})

export default ArticleRating;
