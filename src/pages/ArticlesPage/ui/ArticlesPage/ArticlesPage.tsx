import { memo, useCallback } from "react";
import cls from './ArticlesPage.module.scss';
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { articlesPageReducer } from "../../model/slices/articlesPageSlice";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Page } from "@/widgets/Page";
import { fetchNextArticlesPage } from "@/pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "@/pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { useSearchParams } from "react-router-dom";
import { ArticleInfiniteList } from "../ArticlesInfiniteList/ArticleInfiniteList";
import { useArticleItemById } from "../../model/selectors/articlesPageSelectors";
import { ArticlePageGreeting } from "@/features/ArticlePageGreeting";
import { ToggleFeatures } from "@/shared/features";
import { StickyContentLayout } from "@/shared/layouts/StickyContentLayout/StickyContentLayout";
import { ViewSelectorContainer } from "../ViewSelectorContainer/ViewSelectorContainer";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    }, []);
 
    const content = <ToggleFeatures 
            feature="isAppRedesigned" 
            on={
                <StickyContentLayout
                    left={<ViewSelectorContainer/>}
                    right={<FiltersContainer/>}
                    content={
                        <Page
                            data-testid='ArticlesPage'
                            onScrollEnd={onLoadNextPart}
                            className={cls.ArticlesPageRedesigned}
                        >
                            <ArticleInfiniteList/>
                            <ArticlePageGreeting/>
                        </Page>                      
                }/> 
            } 
            off={
                <Page
                    data-testid='ArticlesPage'
                    onScrollEnd={onLoadNextPart}
                    className={cls.ArticlesPage}
                >
                    <ArticlesPageFilters />
                    <ArticleInfiniteList/>
                    <ArticlePageGreeting/>
                </Page> 
            }/>

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}     
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage);