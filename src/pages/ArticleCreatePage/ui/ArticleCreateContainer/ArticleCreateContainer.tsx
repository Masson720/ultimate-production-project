import { Card } from "@/shared/ui/redesigned/Card/Card"
import { useTranslation } from "react-i18next";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Suspense } from "react";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { AddArticleForm } from "@/widgets/AddArticleForm";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { getErrors, getFormData, getSuccess, useCreateArticle } from "@/features/ArticleEditorManager";

export const ArticleCreateContainer = () => {
    const { t } = useTranslation();
    const formData = useSelector(getFormData);
    const userId = useSelector(getUserAuthData);
    const success = useSelector(getSuccess);
    const errors =  useSelector(getErrors);

    const {
        onChangeTitle, 
        onChangeType, 
        onChangeImg, 
        addBlock, 
        onChangeBlock, 
        onSendArticle
    } = useCreateArticle({
        userId,
        formData
    });

    if(!formData || !userId){
        return null;
    }

    return (
            <Card padding='24' max>
                <VStack gap='32'>
                    <Text size="l" title={t('Создание новой статьи')} />
                    <Suspense fallback={<Skeleton width={600} height={100} />} >
                        <AddArticleForm 
                            onChangeTitle={onChangeTitle}
                            success={success}
                            errors={errors}
                            onChangeType={onChangeType} 
                            onChangeImg={onChangeImg} 
                            addBlock={addBlock}
                            onChangeBlock={onChangeBlock}
                            onSendArticle={onSendArticle}
                            formData={formData}
                        />     
                    </Suspense>
                </VStack>
            </Card>          
    )
}
