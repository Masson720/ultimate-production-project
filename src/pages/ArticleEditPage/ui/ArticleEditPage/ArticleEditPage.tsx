import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { ArticleEditPageContainer } from "../ArticleEditPageContainer/ArticleEditPageContainer";
import { AddArticleFormReducer } from "@/entities/Article";

const reducers: ReducersList = {
    addArticleForm: AddArticleFormReducer
}

const ArticleEditPage = () => {

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page>
                <ArticleEditPageContainer/>
            </Page>            
        </DynamicModuleLoader>

    )
}

export default ArticleEditPage;
