import { ArticleForm, ArticleType } from "@/entities/Article";
import { ArticleBlock } from "@/entities/Article/model/types/article";
import { editArticle } from "@/entities/Article/model/services/fetchArticleById/editArticles";
import { addArticleFormActions } from "@/entities/Article/model/slice/AddArticleFormSlice";
import { UseEditArticleResult } from "@/entities/Article/model/types/articleHooksType";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useCallback, useMemo, useState } from "react";
import { addNewArticle } from "../../../services/fetchArticleById/addNewArticle";
import { validateArticle } from "./validateArticle";

export function useEditArticle (
    formData?: ArticleForm
): UseEditArticleResult {
    const dispatch = useAppDispatch();
    const [validateErrors, setValidateErrors] = useState({});
    
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
            setValidateErrors(validateArticle(formData));
            if(Object.keys(validateErrors).length === 0){
                dispatch(addNewArticle(formData));  
                dispatch(addArticleFormActions.setSuccess(true));
                dispatch(addArticleFormActions.resetForm());
            }
        }
    }, [dispatch, formData]);

    const onEditArticle = useCallback(() => { 
        if(formData){
            setValidateErrors(validateArticle(formData));
            console.log(Object.keys(validateErrors).length);
            if(Object.keys(validateErrors).length === 0){
                dispatch(editArticle(formData)); 
                dispatch(addArticleFormActions.setSuccess(true));
                dispatch(addArticleFormActions.resetForm());                
            }
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
        onEditArticle,
        validateErrors
    }), 
    [onChangeTitle, onChangeType, onChangeImg, addBlock, onChangeBlock, onSendArticle])
}