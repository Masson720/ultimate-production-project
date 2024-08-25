import { Button } from "@/shared/ui/redesigned/Button/Button";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Tablet } from "@/shared/ui/redesigned/Tablet/Tablet";
import { useTranslation } from "react-i18next";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { ArticleTypeSelect } from "@/entities/ArticleTypeSelector";
import { CreateArticleBlock } from "../CreateArticleBlock";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { ImageUploadingBlock } from "../ImageUploadingBlock";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useCallback, useEffect } from "react";
import { ArticleType } from "@/entities/Article";
import { ArticleBlock } from "@/entities/Article/model/types/article";
import { addArticleFormActions } from "../../model/slice/AddArticleFormSlice";
import { sendLog } from "@/shared/lib/sendLog/sendLog";
import { useSelector } from "react-redux";
import { getErrors, getFormData, getSuccess } from "../../model/selectors/addArticleFormSelectors";
import { addNewArticle } from "../../model/services/addNewArticle/addNewArticle";
import { UserActions } from "@/shared/lib/sendLog/types/logs";
import { getUserAuthData } from "@/entities/User";
import { editArticle } from "../../model/services/editArticles/editArticles";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { useParams } from "react-router-dom";
import { ValidateErrors } from "../../model/consts/validateTypes";

interface EditableArticleFormProps {
    className?: string
    editMode?: boolean
}

export const EditableArticleForm = ({ className, editMode }: EditableArticleFormProps) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const formData = useSelector(getFormData);
    const user = useSelector(getUserAuthData);
    const success = useSelector(getSuccess);
    const errors =  useSelector(getErrors);

    useEffect(() => {
        if(editMode){
            dispatch(fetchArticleById(id));
        }
        return () => {
            dispatch(addArticleFormActions.resetForm());
            dispatch(addArticleFormActions.setSuccess(false));
        }
    }, [editMode, dispatch])

    const validateFormTranslates = {
        [ValidateErrors.NO_AUTH]: t('Пользователь не авторизован'),
        [ValidateErrors.NO_BLOCKS]: t('Добавьте хотя бы один блок'),
        [ValidateErrors.NO_DATA]: t('Ошибка, данные не получены'),
        [ValidateErrors.NO_TITLE]: t('Напишите заголовок статьи'),
        [ValidateErrors.NO_TYPE]: t('Выберите хотя бы один тип статьи'),
        [ValidateErrors.SERVER_ERROR]: t('Серверная ошибка')
    }

    const onChangeTitle = useCallback((title: string) => {
        dispatch(addArticleFormActions.setTitle(title));
    }, [dispatch]);

    const onChangeType = useCallback((types: ArticleType[]) => {
        dispatch(addArticleFormActions.setType(types));
    }, [dispatch]);

    const onChangeImg = useCallback((img: string) => {
        dispatch(addArticleFormActions.setImg(img));
    }, [dispatch]);

    const addBlock = useCallback((block: ArticleBlock) => {
        dispatch(addArticleFormActions.createBlock(block));
    }, [dispatch]);

    const onChangeBlock = useCallback((block: ArticleBlock) => {
        dispatch(addArticleFormActions.changeBlock(block));
    }, [dispatch]);

    const onSendArticle = useCallback(() => {
        if(formData){
            dispatch(addNewArticle(formData));
            dispatch(addArticleFormActions.resetForm());
            sendLog(UserActions.CREATE_ARTICLE, {
                userName: user?.username,
                userId: user?.id,
                articleId: formData.id,
                articleName: formData.title
            });   
        }
    }, [dispatch, formData, success]);

    const onEditArticle = useCallback(() => {
        if(formData){
            dispatch(editArticle(formData));
            dispatch(addArticleFormActions.resetForm());
            sendLog(UserActions.EDIT_ARTICLE, {
                userName: user?.username,
                userId: user?.id,
                articleId: formData.id,
                articleName: formData.title
            });      
        }
    }, [dispatch, formData, success]);

    if(!formData){
        return null;
    }
    const form = (
        <>
            {errors?.map(error => <Text variant='error' text={validateFormTranslates[error]} />)}
            <Input size="m" value={formData.title} placeholder={t("Заголовок статьи")} onChange={onChangeTitle}/>
            <ImageUploadingBlock onChange={onChangeImg} img={formData.img} />
            <CreateArticleBlock onChangeBlock={onChangeBlock} addBlock={addBlock} blocks={formData.blocks} />
            <ArticleTypeSelect onClick={onChangeType} types={formData.type} />
            <HStack gap='32' max>
                {editMode 
                    ? 
                    <Button onClick={onEditArticle} variant="filled" >{t('Редактировать')}</Button>
                    :
                    <Button onClick={onSendArticle} variant="filled" >{t('Отправить')}</Button>
                }      
            </HStack>           
        </>
    )

    const successForm = (
        <Tablet size='m' textSize='m' message={editMode ? t('Статья успешно отредактирована') : t('Статья успешно создана')}/>
    )
    
    return (
            <HStack max>
                <VStack gap="24" max >
                    {success ? successForm : form}
                </VStack>
            </HStack>            
    )
}
