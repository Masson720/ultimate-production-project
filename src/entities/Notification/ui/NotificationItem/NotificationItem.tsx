import { Card, CardTheme } from "@/shared/ui/Card/Card";
import { Notification } from "../../model/types/notificationTypes"
import { Text } from "@/shared/ui/Text/Text";
import cls from './NotificationItem.module.scss'

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
        <Card theme={CardTheme.OUTLINED} className={cls.NotificationItem }> 
            <Text title={item.title} text={item.description} />
        </Card>        
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
