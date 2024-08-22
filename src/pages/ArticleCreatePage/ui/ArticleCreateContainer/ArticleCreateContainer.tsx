import { Card } from "@/shared/ui/redesigned/Card/Card"
import { useTranslation } from "react-i18next";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Suspense, useEffect } from "react";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditableArticleForm } from "@/features/EditableArticleForm";
import { addArticleFormActions } from "@/features/EditableArticleForm/model/slice/AddArticleFormSlice";

export const ArticleCreateContainer = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const user = useSelector(getUserAuthData);

    useEffect(()=> {
        return () => {
            dispatch(addArticleFormActions.setSuccess(false));
        }
    }, [user, dispatch]);

    return (
            <Card padding='24' max>
                <VStack gap='32'>
                    <Suspense fallback={<Skeleton width={600} height={100}/>} >
                        <Text size="l" title={t('Создание новой статьи')}/>
                        <EditableArticleForm/>
                    </Suspense>
                </VStack>
            </Card>          
    )
}
