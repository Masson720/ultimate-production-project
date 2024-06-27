import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';
import cls from './ViewSelectorContainer.module.scss'
import { ArticleViewSelector } from '@/features/ArticleViewSelector';


interface ViewSelectorContainerProps {
    className?: string 
}


export const ViewSelectorContainer = (props: ViewSelectorContainerProps) => {
    const { className } = props;
    const { view, onChangeView } = useArticlesFilters();

    return (
        <ArticleViewSelector className={className} view={view} onViewClick={onChangeView} />
    )
}
