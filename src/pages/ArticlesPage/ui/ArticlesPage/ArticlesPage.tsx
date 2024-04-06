import { memo, useCallback } from "react";
import cls from './ArticlesPage.module.scss';
import { ArticleList, ArticleView, ArticleViewSelector } from "entities/Article";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModule/DynamicModuleLoader";
import { articlesPageActions, articlesPageReducer, getArticles } from "../../model/slices/articlesPageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { useSelector } from "react-redux";
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from "../../model/selectors/articlesPageSelectors";

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = () => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);

    useInitialEffect(() => {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList()); 
    });
 
    const onChangeView = useCallback((view: ArticleView) => {
         dispatch(articlesPageActions.setView(view));
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers}>
          <div className={cls.ArticlesPage}>
              <ArticleViewSelector view={view} onViewClick={onChangeView}/>
              <ArticleList 
                  view={view}
                  isLoading={isLoading} 
                  articles={articles}
              /> 
          </div>      
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage);