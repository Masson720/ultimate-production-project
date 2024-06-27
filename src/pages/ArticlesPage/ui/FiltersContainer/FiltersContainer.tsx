import { ArticlesFilters } from "@/widgets/ArticlesFilters";
import { useArticlesFilters } from "../../lib/hooks/useArticlesFilters";

interface FiltersContainerProps {
    className?: string
}

export const FiltersContainer = (props: FiltersContainerProps) => {
    const {className} = props;
    const {
        order, 
        sort, 
        search, 
        type, 
        onChangeOrder, 
        onChangeSearch, 
        onChangeSort,
        onChangeType
    } = useArticlesFilters();

    return (
        <ArticlesFilters 
            search={search} 
            order={order} 
            sort={sort} 
            type={type} 
            onChangeOrder={onChangeOrder} 
            onChangeSearch={onChangeSearch} 
            onChangeSort={onChangeSort}
            className={className}
            onChangeTab={onChangeType}
        />
    )
}
