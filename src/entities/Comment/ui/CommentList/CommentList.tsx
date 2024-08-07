import { classNames } from "@/shared/lib/classNames/classNames";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { useTranslation } from "react-i18next";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from '../../model/types/comment';
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ToggleFeatures } from "@/shared/features";

interface CommentListProps {
    className?: string
    comments?: Comment[]
    isLoading?: boolean
}

export const CommentList = (props: CommentListProps) => {
    const {
        className,
        comments,
        isLoading
    } = props;

    const { t } = useTranslation();

    if(isLoading){
        return (
            <VStack
                gap='16'
                max 
                className={classNames('', {}, [className])}
            >
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        )
    }

    return (
        <VStack
            gap='16'
            max
            className={classNames('', {}, [className])}
        >
            {comments?.length 
                ? comments.map(comment => (
                    <CommentCard 
                        comment={comment} 
                        isLoading={isLoading} 
                    />
                ))
                : <ToggleFeatures
                    feature="isAppRedesigned"
                    off={
                        <TextDeprecated text={t('Комментарии отсутствуют')}/>
                    }
                    on={
                        <Text text={t('Комментарии отсутствуют')}/>
                    }
                />
            }
        </VStack>
   )
 }
 