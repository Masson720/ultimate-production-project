import { ArticleType } from "@/entities/Article";
import { ArticleBlock } from "@/entities/Article/model/types/article";
import { User } from "@/entities/User";
import { addNewArticle } from "@/features/ArticleEditorManager/model/services/addNewArticle";
import { addArticleFormActions } from "@/features/ArticleEditorManager/model/slice/AddArticleFormSlice";
import { ArticleForm } from "@/features/ArticleEditorManager/model/types/AddArticleFormSchema";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useCallback, useEffect, useMemo } from "react";

interface UseCreateArticleProps {
    userId?: User
    formData?: ArticleForm
}

interface UseCreateArticleResult {
    onChangeTitle: (value: string) => void
    onChangeType: (types: ArticleType[]) => void
    onChangeImg: (img: string) => void
    addBlock: (block: ArticleBlock) => void
    onChangeBlock: (block: ArticleBlock) => void
    onSendArticle: () => void
}

export function useCreateArticle ({
    userId,
    formData
}: UseCreateArticleProps): UseCreateArticleResult {
    const dispatch = useAppDispatch();

    useEffect(()=> {
        if(userId){
            dispatch(addArticleFormActions.setUserId(userId?.id));
        }
        return () => {
            dispatch(addArticleFormActions.setSuccess(false));
        }
    }, [userId, dispatch]);
    
    const onChangeTitle = useCallback((title: string) => {
        dispatch(addArticleFormActions.setTitle(title));
    }, [dispatch]);

    const onChangeType = useCallback((types: ArticleType[]) => {
        dispatch(addArticleFormActions.setType(types))
    }, [dispatch]);

    const onChangeImg = useCallback((img: string) => {
        dispatch(addArticleFormActions.setImg(img))
    }, [dispatch]);

    const addBlock = useCallback((block: ArticleBlock) => {
        dispatch(addArticleFormActions.createBlock(block))
    }, [dispatch]);

    const onChangeBlock = useCallback((block: ArticleBlock) => {
        dispatch(addArticleFormActions.changeBlock(block))
    }, [dispatch]);

    const onSendArticle = useCallback(() => {
        if(formData){
            dispatch(addNewArticle(formData));
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
        onSendArticle
    }), 
    [onChangeTitle, onChangeType, onChangeImg, addBlock, onChangeBlock, onSendArticle])
}