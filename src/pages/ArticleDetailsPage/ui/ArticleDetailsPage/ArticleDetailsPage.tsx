import { ArticleDetails} from "@/entities/Article";
import { memo } from "react";
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { Page } from "@/widgets/Page";
import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { ArticleRecomendationsList } from "@/features/articleRecomendationsList";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticleRating } from "@/features/articleRating";
import { ToggleFeatures } from "@/shared/features";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Card } from "@/shared/ui/deprecated/Card/Card";

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = () => {
    const { id } = useParams<{id: string}>();
    const {t} = useTranslation('article');

    if(!id){
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page>
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader/>
                    <ArticleDetails id={id}/>
                    <ToggleFeatures 
                        feature={'isArticleRatingEnabled'}
                        on={<ArticleRating articleId={id} />}
                        off={<Card>Оценка статей скоро появится</Card>}
                    />
                    <ArticleRecomendationsList/>              
                    <ArticleDetailsComments id={id}/>
                </VStack>
            </Page> 
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage);