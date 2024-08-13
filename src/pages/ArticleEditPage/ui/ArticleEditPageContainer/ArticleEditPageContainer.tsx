import { Card } from "@/shared/ui/redesigned/Card/Card";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { AddArticleForm } from "@/widgets/AddArticleForm";
import { Suspense, useEffect } from "react";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addArticleFormActions, getErrors, getFormData, getSuccess, getValidateErrors, useEditArticle } from "@/entities/Article";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticleById } from "@/entities/Article/model/services/fetchArticleById/fetchArticleById";

export const ArticleEditPageContainer = () => {
    const { id } = useParams<{id: string}>();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const formData = useSelector(getFormData);
    const success = useSelector(getSuccess);
    const errors =  useSelector(getErrors);
    const validateErrors = useSelector(getValidateErrors);

    useEffect(() => {
        if(id){
            dispatch(fetchArticleById(id));
        }
        return () => {
            dispatch(addArticleFormActions.setSuccess(false));
        }
    }, [id, dispatch]);

    const {
        onChangeBlock,
        onChangeTitle,
        onChangeType,
        onChangeImg,
        addBlock,
        onEditArticle
    } = useEditArticle(formData);

    return (
        <Card padding='24' max>
            <VStack gap='32'>
                <Text size="l" title={t('Редактирование статьи')} />
                <Suspense fallback={<Skeleton width={600} height={100} />} >
                    <AddArticleForm 
                        onChangeTitle={onChangeTitle}
                        success={success}
                        errors={errors}
                        validateErrors={validateErrors}
                        onChangeType={onChangeType} 
                        onChangeImg={onChangeImg} 
                        addBlock={addBlock}
                        onChangeBlock={onChangeBlock}
                        onSendArticle={onEditArticle}
                        formData={formData}
                    />     
                </Suspense>
            </VStack>
        </Card> 
    )
}