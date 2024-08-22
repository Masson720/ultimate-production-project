import { Card } from "@/shared/ui/redesigned/Card/Card";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Suspense, useEffect } from "react";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticleById } from "@/entities/Article/model/services/fetchArticleById/fetchArticleById";
import { EditableArticleForm } from "@/features/EditableArticleForm";
import { addArticleFormActions } from "@/features/EditableArticleForm/model/slice/AddArticleFormSlice";

export const ArticleEditPageContainer = () => {
    const { id } = useParams<{id: string}>();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(id){
            dispatch(fetchArticleById(id));
        }
        return () => {
            dispatch(addArticleFormActions.setSuccess(false));
        }
    }, [id, dispatch]);

    return (
        <Card padding='24' max>
            <VStack gap='32'>
                <Text size="l" title={t('Редактирование статьи')} />
                <Suspense fallback={<Skeleton width={600} height={100} />} >
                    <EditableArticleForm editMode/>
                </Suspense>
            </VStack>
        </Card> 
    )
}