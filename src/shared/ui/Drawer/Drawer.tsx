import { useTheme } from "app/providers/ThemeProvider";
import { ReactNode, memo } from "react";
import { Portal } from "../Portal/Portal";
import { ModsType, classNames } from "shared/lib/classNames/classNames";
import cls from './Drawer.module.scss';
import { Overlay } from "../Overlay/Overlay";
import { useModal } from "shared/lib/hooks/useModal/useModal";

interface DrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy
    } = props;
    
    const { theme } = useTheme();

    const {
        close,
        isClosing,
        isMounted
    } = useModal({
        animationDelay: 500, 
        onClose, 
        isOpen
    });

    const mods: ModsType = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    }

    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className, theme, 'add_drawer'])}>
                <Overlay onClick={close} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    )
})
