import { NotificationList } from "@/entities/Notification";
import { memo, useCallback, useState } from "react";
import { Button as ButtonDeprecated, ThemeButton } from "@/shared/ui/deprecated/Button/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";
import { Popover as PopoverDeprecated } from "@/shared/ui/deprecated/Popups";
import cls from './NotificationButton.module.scss';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { classNames } from "@/shared/lib/classNames/classNames";
import { Drawer } from "@/shared/ui/redesigned/Drawer/Drawer";
import { BrowserView, MobileView } from "react-device-detect";
import { ToggleFeatures } from "@/shared/features";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import { Popover } from "@/shared/ui/redesigned/Popups";

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
        <ToggleFeatures
            feature='isAppRedesigned'
            off={
                <ButtonDeprecated onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
                    <IconDeprecated Svg={NotificationIconDeprecated} inverted/>
                </ButtonDeprecated>                
            }
            on={
                <Icon onClick={onOpenDrawer} Svg={NotificationIcon} clickable/>   
            }
        />
                      
    )

    return (
        <div>
            <BrowserView>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Popover
                            direction="bottom left"
                            className={classNames(cls.NotificationButton, {}, [className])}
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </Popover>                        
                    }
                    off={
                        <PopoverDeprecated
                            direction="bottom left"
                            className={classNames(cls.NotificationButton, {}, [className])}
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </PopoverDeprecated>                        
                    }
                />
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
