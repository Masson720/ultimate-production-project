import { Card } from "@/shared/ui/redesigned/Card/Card"
import { useTranslation } from "react-i18next";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Suspense, useEffect } from "react";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { AddArticleForm } from "@/widgets/AddArticleForm";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { 
    addArticleFormActions, 
    getErrors, getFormData, 
    getSuccess, 
    getValidateErrors, 
    useEditArticle 
} from "@/entities/Article";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

export const ArticleCreateContainer = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const formData = useSelector(getFormData);
    const userId = useSelector(getUserAuthData);
    const success = useSelector(getSuccess);
    const errors =  useSelector(getErrors);
    const validateErrors = useSelector(getValidateErrors);

    useEffect(()=> {
        if(userId){
            dispatch(addArticleFormActions.setUserId(userId?.id));
        }
        return () => {
            dispatch(addArticleFormActions.setSuccess(false));
        }
    }, [userId, dispatch]);

    const {
        onChangeTitle, 
        onChangeType, 
        onChangeImg, 
        addBlock, 
        onChangeBlock, 
        onSendArticle
    } = useEditArticle(formData);

    return (
            <Card padding='24' max>
                <VStack gap='32'>
                    <Suspense fallback={<Skeleton width={600} height={100}/>} >
                        <Text size="l" title={t('Создание новой статьи')}/>
                        <AddArticleForm 
                            onChangeTitle={onChangeTitle}
                            success={success}
                            errors={errors}
                            onChangeType={onChangeType} 
                            onChangeImg={onChangeImg} 
                            addBlock={addBlock}
                            onChangeBlock={onChangeBlock}
                            onSendArticle={onSendArticle}
                            validateErrors={validateErrors}
                            formData={formData}
                        />     
                    </Suspense>
                </VStack>
            </Card>          
    )
}
