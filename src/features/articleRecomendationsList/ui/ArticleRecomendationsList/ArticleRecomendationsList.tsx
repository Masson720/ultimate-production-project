import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleList } from '@/entities/Article';
import { useArticleRecomendationsList } from '../../api/articleRecommendationsApi';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { TextSize, Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { ToggleFeatures } from '@/shared/features';

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
        <VStack 
            data-testid='ArticleRecomendationsList' 
            gap='8' className={classNames('', {}, [className])}
        >
            <ToggleFeatures
                feature='isAppRedesigned'
                off={
                    <TextDeprecated
                        size={TextSize.L}
                        title={t('Рекомендуем')}
                    />
                }
                on={
                    <Text
                        size='l'
                        title={t('Рекомендуем')}
                    />
                }
            />

            <ArticleList
                articles={articles}
                target='_blank'
            />
        </VStack>
    );
});