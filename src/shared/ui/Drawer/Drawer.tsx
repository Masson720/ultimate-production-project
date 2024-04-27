import { useTheme } from "app/providers/ThemeProvider";
import { ReactNode, memo } from "react";
import { Portal } from "../Portal/Portal";
import { ModsType, classNames } from "shared/lib/classNames/classNames";
import cls from './Drawer.module.scss';
import { Overlay } from "../Overlay/Overlay";

interface DrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        className,
        children,
        isOpen,
        onClose
    } = props;
    console.log(isOpen);
    const { theme } = useTheme();

    const mods: ModsType = {
        [cls.opened]: isOpen
    }

    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className, theme, 'add_drawer'])}>
                <Overlay onClick={onClose} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    )
})
