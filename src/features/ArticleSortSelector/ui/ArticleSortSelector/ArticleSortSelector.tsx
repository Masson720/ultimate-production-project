import { Select, SelectOptions } from '@/shared/ui/Select/Select';
import cls from './ArticleSortSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '@/entities/Article';

interface ArticleSortSelectorProps {
    className?: string
    sort: ArticleSortField
    order: SortOrder
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort
    } = props;

    const { t } = useTranslation('article');

    const orderOptions = useMemo<SelectOptions<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию')
        },
        {
            value: 'desc',
            content: t('убыванию')
        }
    ], [t]);

    const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('дате создания')
        },
        {
            value: ArticleSortField.TITLE,
            content: t('названию')
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('просмотрам')
        },
    ], [t]);

    const changeSortHandler = useCallback((newSort: string) => {
        onChangeSort(newSort as ArticleSortField);
    }, [onChangeSort]);

    const changeOrderHandler = useCallback((newOrder: string) => {
        onChangeOrder(newOrder as SortOrder);
    }, [onChangeOrder]);

    return (
        <div className={cls.ArticleSortSelector}>
            <Select<ArticleSortField>
                options={sortFieldOptions}
                value={sort}
                label={t('Сортировать ПО')}
                onChange={onChangeSort}
            />
            <Select 
                options={orderOptions}
                className={cls.order}
                value={order}
                label={t('по')}
                onChange={onChangeOrder}
            />
        </div>
    )
}
