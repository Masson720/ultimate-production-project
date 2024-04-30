import { ArticleList } from "@/entities/Article"
import { getArticlesPageIsLoading, getArticlesPageError, getArticlesPageView } from "@/pages/ArticlesPage/model/selectors/articlesPageSelectors";
import { getArticles } from "@/pages/ArticlesPage/model/slices/articlesPageSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Text } from '@/shared/ui/Text/Text';

interface ArticleInfiniteListProps {
    className?: string
}

export const ArticleInfiniteList = (props: ArticleInfiniteListProps) => {
    const {
        className
    } = props;
    const {t} = useTranslation();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);

    if(error){
        return (
            <Text text={t('Произошла ошибка при загрузке статей')}/>
        )
    }

    return (
        <ArticleList
            className={className} 
            view={view}
            isLoading={isLoading} 
            articles={articles}
        />
    )
}
