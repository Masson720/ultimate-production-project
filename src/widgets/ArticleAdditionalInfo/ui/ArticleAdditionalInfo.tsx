import { User } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ArticleAdditionalInfo.module.scss';
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/redesigned/Button/Button";


interface ArticleAdditionalInfoProps {
    className?: string
    author: User
    id?: string
    createdAt: string
    views: number
    onEdit: () => void
    onBackToList: () => void
}

export const ArticleAdditionalInfo = (props: ArticleAdditionalInfoProps) => {
    const {
        className,
        author,
        createdAt,
        id,
        views,
        onEdit,
        onBackToList
    } = props;
    const { t } = useTranslation();
     
    return (
        <VStack 
            gap='8'
            className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
        >
            <HStack gap='16'>
                    <Avatar src={author.avatar} size={32}/>
                    <Text text={author.username} bold/>
                    <Text text={createdAt}/>
            </HStack>
            <VStack gap='8'>
                {id === author.id &&  <Button onClick={onEdit}>{t('Редактировать')}</Button>}
                <Button onClick={onBackToList} >{t('Назад к списку')}</Button>                
            </VStack>
            <Text text={t('{{count}} просмотров', {count: views})}/>
        </VStack>
    )
}