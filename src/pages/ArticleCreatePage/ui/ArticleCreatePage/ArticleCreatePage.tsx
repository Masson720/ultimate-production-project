import { Page } from "@/widgets/Page";
import { ArticleCreateContainer } from "../ArticleCreateContainer/ArticleCreateContainer";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { AddArticleFormReducer } from "@/entities/Article";

const reducers: ReducersList = {
    addArticleForm: AddArticleFormReducer
}

export const ArticleCreatePage = () => {
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page>
                <ArticleCreateContainer/>
            </Page>            
        </DynamicModuleLoader>
    )
}

export default ArticleCreatePage;