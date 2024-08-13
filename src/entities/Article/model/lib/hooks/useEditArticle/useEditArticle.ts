import { ArticleBlock } from "../../../../model/types/article";
import { addArticleFormActions } from "../../../../model/slice/AddArticleFormSlice";
import { UseEditArticleResult } from "../../../../model/types/articleHooksType";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useCallback, useEffect, useMemo, useState } from "react";
import { addNewArticle } from "../../../services/addNewArticle/addNewArticle";
import { useSelector } from "react-redux";
import { ArticleForm } from "../../../types/AddArticleFormSchema";
import { getValidateErrors } from "../../../selector/addArticleFormSelectors";
import { ArticleType } from "../../../consts/articleConsts";
import { editArticle } from "../../../services/editArticles/editArticles";

export function useEditArticle (
    formData?: ArticleForm
): UseEditArticleResult {
    const dispatch = useAppDispatch();
    const validateErrors = useSelector(getValidateErrors);
    const [validateSuccess, setValidateSuccess] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(addArticleFormActions.resetValidate());
        }
    }, [formData]);
    
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

    const validateArticle = useCallback(() => {
        let isValid = true;

        if (!formData?.title || formData?.title.trim() === '') {
            dispatch(addArticleFormActions.validateTitle('Введите название статьи'));
            isValid = false;
        } else {
            dispatch(addArticleFormActions.validateTitle(''));
        }

        if (!formData?.type || formData?.type.length === 0) {
            dispatch(addArticleFormActions.validateType('Выберите хотя бы одну тему'));
            isValid = false;
        } else {
            dispatch(addArticleFormActions.validateType(''));
        }

        if (!formData?.blocks || formData?.blocks.length === 0) {
            dispatch(addArticleFormActions.validateBlocks('Отсутствует тело статьи'));
            isValid = false;
        } else {
            dispatch(addArticleFormActions.validateBlocks(''));
        }
        setValidateSuccess(isValid);
    }, [dispatch, formData]);

    const onSendArticle = useCallback(() => {
        validateArticle();
        if(formData && validateSuccess){
            dispatch(addNewArticle(formData));  
            dispatch(addArticleFormActions.setSuccess(true));
            dispatch(addArticleFormActions.resetForm());
        }
    }, [dispatch, formData, validateErrors, validateSuccess]);

    const onEditArticle = useCallback(() => {
        validateArticle();
        if(formData && validateSuccess){
            dispatch(editArticle(formData)); 
            dispatch(addArticleFormActions.setSuccess(true));
            dispatch(addArticleFormActions.resetForm());                
        }
    }, [dispatch, formData]);

    return useMemo(
        () => ({
        onChangeTitle, 
        onChangeType, 
        onChangeImg, 
        addBlock, 
        onChangeBlock, 
        onSendArticle,
        onEditArticle
    }), 
    [onChangeTitle, onChangeType, onChangeImg, addBlock, onChangeBlock, onSendArticle])
}