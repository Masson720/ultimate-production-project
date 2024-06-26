import { Comment } from "@/entities/Comment/model/types/comment";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './CommentCard.module.scss';
import { Avatar } from "@/shared/ui/deprecated/Avatar/Avatar";
import { Text } from "@/shared/ui/deprecated/Text/Text";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { AppLink } from "@/shared/ui/deprecated/AppLink/AppLink";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { getRouteProfile } from "@/shared/const/router";

interface CommentCardProps {
    className?: string
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard = (props: CommentCardProps) => {
    const {
        className,
        comment,
        isLoading
    } = props;

    console.log(comment);

    if(isLoading){
        return (
            <VStack data-testid='CommentCard.Loading' gap='8' max className={classNames(cls.CommentCard, {}, [className])}>
                <div  className={cls.header}>
                    <Skeleton width={30} height={30} border={'50%'}/>
                    <Skeleton width={100} height={16} className={cls.username}/>
                </div>
                <Skeleton width={'100%'} height={50} className={cls.text}/>
            </VStack>
        )
    }

    if(!comment) {
        return null;
    }

    return (
        <VStack data-testid='CommentCard.Content' max gap='8' className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
                {comment.avatar && <Avatar size={30} src={comment.avatar}/>}
                <Text className={cls.username} title={comment.user.username}/>
            </AppLink>
            <Text className={cls.text} text={comment.text} />
        </VStack>
    )
}
