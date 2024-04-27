import { NotificationList } from "entities/Notification";
import { memo } from "react";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import { Popover } from "shared/ui/Popups";
import cls from './NotificationButton.module.scss';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import { classNames } from "shared/lib/classNames/classNames";

interface NotificationButtonProps {
    className?: string 
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const {
        className
    } = props;

    return (
        <Popover
            direction="bottom left"
            className={classNames(cls.NotificationButton, {}, [className])}
            trigger={(
        <Button theme={ThemeButton.CLEAR}>
            <Icon Svg={NotificationIcon} inverted/>
        </Button>                        
        )}>
            <NotificationList className={cls.notifications} />
        </Popover>
    )
})
