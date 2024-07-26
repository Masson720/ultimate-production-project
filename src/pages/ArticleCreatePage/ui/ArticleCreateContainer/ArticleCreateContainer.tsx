import { Card } from "@/shared/ui/redesigned/Card/Card"
import { useTranslation } from "react-i18next";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Suspense, useCallback } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { AddArticleFormReducer } from "@/widgets/AddArticleForm/model/slice/AddArticleFormSlice";
import { AddArticleForm } from "@/widgets/AddArticleForm";

const reducers: ReducersList = {
    addArticleForm: AddArticleFormReducer
}

export const ArticleCreateContainer = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    
    const sendNewArticle = useCallback((newArticle: any) => {
        // dispatch()
    }, []);

    
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card padding='24' max>
                <VStack gap='32'>
                    <Text size="l" title={t('Создание новой статьи')} />
                    <Suspense fallback={<Skeleton width={600} height={100} />} >
                        <AddArticleForm addArticle={sendNewArticle}/>     
                    </Suspense>
                </VStack>
            </Card>            
        </DynamicModuleLoader>

    )
}
