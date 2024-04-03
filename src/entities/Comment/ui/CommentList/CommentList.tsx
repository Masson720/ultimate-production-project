import { classNames } from "shared/lib/classNames/classNames";
import cls from './CommentList.module.scss';
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from '../../model/types/comment';

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

    return (
        <div className={classNames(cls.CommentList, {}, [])}>
            {comments?.length 
                ? comments.map(comment => (
                    <CommentCard 
                        comment={comment} 
                        isLoading={isLoading} 
                        className={cls.comment}
                    />
                ))
                : <Text text={t('Комментарии отсутствуют')}/>
            }
        </div>
   )
 }
 