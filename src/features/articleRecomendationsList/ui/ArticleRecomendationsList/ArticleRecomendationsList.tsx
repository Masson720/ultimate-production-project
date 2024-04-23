import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { TextSize, Text } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article';
import { useArticleRecomendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecomendationsListProps {
    className?: string;
}

export const ArticleRecomendationsList = memo((props: ArticleRecomendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { isLoading, data: articles, error } = useArticleRecomendationsList(3);

    if(isLoading || error || !articles){
        return null;
    }
    
    return (
        <div className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('Рекомендуем')}
            />
            <ArticleList
                articles={articles}
                target='_blank'
                virtualized={false}
            />
        </div>
    );
});