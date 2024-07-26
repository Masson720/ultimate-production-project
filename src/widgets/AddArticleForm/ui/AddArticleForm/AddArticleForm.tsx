import cls from './AddArticleForm.module.scss';
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { HStack } from "@/shared/ui/redesigned/Stack/HStack/HStack";
import { memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AddArticleFormSchema } from "../../model/types/AddArticleFormSchema";
import { getFormData } from "../../model/selectors/addArticleFormSelectors";
import { ArticleType } from "@/entities/Article";
import { addArticleFormActions } from "../../model/slice/AddArticleFormSlice";
import { ArticleBlock } from "@/entities/Article/model/types/article";
import { CreateArticleBlock } from "@/features/CreateArticleBlock";
import { ImageUploadingBlock } from "@/features/ImageUploadingBlock";
import { ArticleTypeSelect } from '@/entities/ArticleTypeSelector';
import { addNewArticle } from '@/pages/ArticleCreatePage/model/services/addNewArticle';
import { getUserAuthData } from '@/entities/User';

interface AddArticleFormProps {
    className?: string
    addArticle: (article: AddArticleFormSchema) => void
}

const AddArticleForm = (props: AddArticleFormProps) => {
    const { className, addArticle } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const formData = useSelector(getFormData);
    const userId = useSelector(getUserAuthData);

    useEffect(()=> {
        dispatch(addArticleFormActions.setUserId(userId?.id));
    }, [])

    const onChangeTitle = useCallback((value: string) => {
        dispatch(addArticleFormActions.setTitle(value));
    }, [dispatch]);

    const onChangeType = useCallback((types: ArticleType[]) => {
        dispatch(addArticleFormActions.setType(types));
    }, [dispatch]);

    const onChangeImg = useCallback((value: string) => {
       dispatch(addArticleFormActions.setImg(value));
    }, [dispatch]);

    const addBlock = useCallback((block: ArticleBlock) => {
        dispatch(addArticleFormActions.createBlock(block));
    }, [dispatch]);

    const onChangeBlock = useCallback((block: ArticleBlock) => {
        dispatch(addArticleFormActions.changeBlock(block));
    }, [dispatch]);

    const onSendArticle = useCallback(() => {
        console.log(formData)
        if(formData){
            dispatch(addNewArticle(formData));
        }
    }, [dispatch]);

    const onDelete = useCallback(() => {
        
    }, [dispatch]);

    if(!formData || !userId){
        return null;
    }
    
    return (
            <HStack max>
                <VStack gap="24" max >
                    <Input size="m" value={formData.title} placeholder={t("Заголовок статьи")} onChange={onChangeTitle} />
                    <ImageUploadingBlock onChange={onChangeImg} img={formData.img} />
                    <CreateArticleBlock userId={userId?.id} onChangeBlock={onChangeBlock} addBlock={addBlock} blocks={formData.blocks} />
                    <ArticleTypeSelect onClick={onChangeType} types={formData.type} />

                    <HStack gap='32' max>
                        <Button>{t('В черновик')}</Button>
                        <Button color="error" onClick={onDelete}>{t('Удалить')}</Button>
                        <Button onClick={onSendArticle} variant="filled" >{t('Отправить')}</Button>                
                    </HStack>                
                </VStack>
            </HStack>            


    )
}


export default memo(AddArticleForm);