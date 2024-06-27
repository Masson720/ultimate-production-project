import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ArticlesPageFilters.module.scss';
import { useTranslation } from "react-i18next";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleViewSelector } from "@/features/ArticleViewSelector";
import { ArticleTabsType } from "@/features/ArticleTypeTabs";
import { Card } from "@/shared/ui/deprecated/Card/Card";
import { Input } from "@/shared/ui/deprecated/Input/Input";
import { useArticlesFilters } from "../../lib/hooks/useArticlesFilters";


export const ArticlesPageFilters = () => {
    const { t } = useTranslation('article');
    const { 
        view, 
        order, 
        sort, 
        search, 
        type, 
        onChangeOrder, 
        onChangeSearch, 
        onChangeSort, 
        onChangeType, 
        onChangeView 
    } = useArticlesFilters();

    return (
        <div className={classNames('', {}, [])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView}/>
            </div>
            <Card className={cls.search}>
                <Input 
                    onChange={onChangeSearch} 
                    value={search} 
                    placeholder={t('Поиск')} 
                />
            </Card>
            <ArticleTabsType
                value={type}
                className={cls.tabs}
                onChangeTab={onChangeType} 
            />
        </div>
    )
}