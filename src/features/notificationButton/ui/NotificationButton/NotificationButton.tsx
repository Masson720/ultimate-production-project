import { NotificationList } from "@/entities/Notification";
import { memo, useCallback, useState } from "react";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Popover } from "@/shared/ui/Popups";
import cls from './NotificationButton.module.scss';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { classNames } from "@/shared/lib/classNames/classNames";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import { BrowserView, MobileView } from "react-device-detect";

interface NotificationButtonProps {
    className?: string 
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const {
        className
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, []);

    const trigger = (
        <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
            <Icon Svg={NotificationIcon} inverted/>
        </Button>                        
    )

    return (
        <div>
            <BrowserView>
                <Popover
                    direction="bottom left"
                    className={classNames(cls.NotificationButton, {}, [className])}
                    trigger={trigger}
                >
                    <NotificationList className={cls.notifications} />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer} > 
                    <NotificationList/>
                </Drawer>                             
            </MobileView>
        </div>
    )
})