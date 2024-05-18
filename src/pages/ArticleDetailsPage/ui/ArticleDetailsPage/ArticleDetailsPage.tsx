import { ArticleDetails} from "@/entities/Article";
import { memo } from "react";
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { Page } from "@/widgets/Page";
import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { VStack } from "@/shared/ui/Stack";
import { ArticleRecomendationsList } from "@/features/articleRecomendationsList";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticleRating } from "@/features/articleRating";
import { getFeatureFlag, toggleFeatures } from "@/shared/features";
import { Card } from "@/shared/ui/Card/Card";

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

const Counter = () => <div>Old Counter</div>
const CounterRedesigned = () => <div>New Counter</div>


const ArticleDetailsPage = () => {
    const { id } = useParams<{id: string}>();
    const {t} = useTranslation('article');
    const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');
    const isCounterEnabled = getFeatureFlag('isCounterEnabled');

    if(!id){
        return null;
    }

    const articleRatingCard = toggleFeatures({
        name: 'isCounterEnabled',
        on: () => <ArticleRating articleId={id} />,
        off: () => <Card>Оценка статей скоро появится</Card>
    })

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page>
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader/>
                    <ArticleDetails id={id}/>
                    {articleRatingCard}
                    <ArticleRecomendationsList/>              
                    <ArticleDetailsComments id={id}/>
                </VStack>
            </Page> 
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage);