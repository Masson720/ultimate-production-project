import { Card } from '@/shared/ui/redesigned/Card/Card';
import cls from './ArticlesFilters.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleTabsType } from '@/features/ArticleTypeTabs';
import { useTranslation } from 'react-i18next';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input/Input';

interface ArticlesFiltersProps {
    className?: string
    sort: ArticleSortField
    order: SortOrder
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSearch: (value: string) => void
    onChangeSort: (newSort: ArticleSortField) => void
    type: ArticleType
    search: string
    onChangeTab: (type: ArticleType) => void 
}

export const ArticlesFilters = (props: ArticlesFiltersProps) => {
    const { 
        className, 
        sort, 
        order, 
        onChangeSearch, 
        onChangeOrder, 
        onChangeSort, 
        onChangeTab, 
        search, 
        type 
    } = props;

    const { t } = useTranslation();

    return (
        <Card 
            className={classNames(cls.ArticlesFilters, {}, [className])} 
            padding='24'
        >
            <VStack gap='32'>
                <Input 
                    onChange={onChangeSearch} 
                    value={search} 
                    placeholder={t('Поиск')} 
                />
                <ArticleTabsType
                    value={type}
                    className={cls.tabs}
                    onChangeTab={onChangeTab} 
                />                           
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    )
}
