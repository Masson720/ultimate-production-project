import { Card as CardDeprecated, CardTheme } from "@/shared/ui/deprecated/Card/Card";
import { Notification } from "../../model/types/notificationTypes"
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import cls from './NotificationItem.module.scss'
import { ToggleFeatures } from "@/shared/features";
import { Card } from "@/shared/ui/redesigned/Card/Card";

interface NotificationItemProps {
    className?: string
    item: Notification
}

export const NotificationItem = (props: NotificationItemProps) => {
    const {
        className,
        item
    } = props;

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card variant='normal' padding="8" className={cls.NotificationItem }> 
                    <Text title={item.title} text={item.description} />
                </Card>                     
            }
            off={
                <CardDeprecated theme={CardTheme.OUTLINED} className={cls.NotificationItem }> 
                    <TextDeprecated title={item.title} text={item.description} />
                </CardDeprecated>                    
            }
        /> 
    
    )

    if(item.href){ 
        return (
            <a className={cls.link} target="_blank" href={item.href}>
                {content}
            </a>
        )
    }

    return content; 
}
