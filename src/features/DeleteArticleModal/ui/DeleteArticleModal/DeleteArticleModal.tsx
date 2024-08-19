import { deleteArticle } from "@/entities/Article";
import { getRouteArticles } from "@/shared/const/router";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { Modal } from "@/shared/ui/redesigned/Modal/Modal";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface DeleteArticleModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    articleId: string
}

const DeleteArticleModal = (props: DeleteArticleModalProps) => {
    const {
        isOpen,
        onClose,
        articleId
    } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const onDelete = useCallback(() => {
        setDeleteSuccess(true);
        dispatch(deleteArticle(articleId));
    }, [articleId]);
    
    const returnArticle = useCallback(() => {
        onClose();
        navigate(getRouteArticles(), {replace: true});
        //ToDo сделать обновление стейта, убрать перезагрузку
        navigate(0);
    }, [deleteSuccess])

    return (
        <Modal 
            isOpen={isOpen}
            onClose={returnArticle}
        >
            <VStack gap="32">
                {
                    deleteSuccess 
                        ?
                    <Text size='l' title={t('Статья удалена')} />
                        :
                    <>
                        <Text title={t('Вы уверены что хотите удалить эту статью?')} />
                        <HStack gap='32' justify="center" max >
                            <Button onClick={onDelete} >{t('Да')}</Button>
                            <Button onClick={onClose}>{t('Нет')}</Button>
                        </HStack>
                    </>    
                }
            </VStack>
        </Modal>
    )
}

export default memo(DeleteArticleModal);
