import { Comment } from "@/entities/Comment/model/types/comment";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './CommentCard.module.scss';
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar/Avatar";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { AppLink as AppLinkDeprecated } from "@/shared/ui/deprecated/AppLink/AppLink";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { getRouteProfile } from "@/shared/const/router";
import { ToggleFeatures, toggleFeatures } from "@/shared/features";
import { AppLink } from "@/shared/ui/redesigned/AppLink/AppLink";
import { Card } from "@/shared/ui/redesigned/Card/Card";

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

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => SkeletonDeprecated,
        on: () => SkeletonRedesigned
    })

    console.log(comment)

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
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <VStack data-testid='CommentCard.Content' max gap='8' className={classNames(cls.CommentCard, {}, [className])}>
                    <AppLinkDeprecated to={getRouteProfile(comment.user.id)} className={cls.header}>
                        {comment.avatar && <AvatarDeprecated size={30} src={comment.user.avatar}/>}
                        <TextDeprecated className={cls.username} title={comment.user.username}/>
                    </AppLinkDeprecated>
                    <Text className={cls.text} text={comment.text} />
                </VStack>
            }
            on={ 
                <Card padding='24' border='partial' max>
                    <VStack data-testid='CommentCard.Content' max gap='8' className={classNames(cls.CommentCardRedesigned, {}, [className])}>
                        <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
                            <HStack gap='8'>
                                {comment.user.avatar && <Avatar size={30} src={comment.user.avatar}/>}
                                <Text className={cls.username} bold text={comment.user.username}/>                                
                            </HStack>
                        </AppLink>
                        <Text className={cls.text} text={comment.text} />
                    </VStack>
                </Card>
            }
        />
    )
}
