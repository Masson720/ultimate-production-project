import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ArticlesPageFilters.module.scss';
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useCallback } from "react";
import { getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType, getArticlesPageView } from "../../model/selectors/articlesPageSelectors";
import { ArticleSortField, ArticleSortSelector, ArticleTabsType, ArticleType, ArticleView, ArticleViewSelector } from "@/entities/Article";
import { articlesPageActions } from "../../model/slices/articlesPageSlice";
import { useTranslation } from "react-i18next";
import { Card } from "@/shared/ui/Card/Card";
import { Input } from "@/shared/ui/Input/Input";
import { SortOrder } from "@/shared/types";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";


export const ArticlesPageFilters = () => {
    const view = useSelector(getArticlesPageView);
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article');
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({replace: true}));  
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
   }, [dispatch]);

   const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);
 
    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch (search));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlesPageActions.setType(value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);


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