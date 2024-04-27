import { ModsType, classNames } from "../../lib/classNames/classNames";
import cls from './Modal.module.scss';
import { FC, ReactNode } from "react";
import { Portal } from "../Portal/Portal";
import { useTheme } from "app/providers/ThemeProvider";
import { Overlay } from "../Overlay/Overlay";
import { useModal } from "shared/lib/hooks/useModal/useModal";

interface ModalProps {
    children?: ReactNode
    className?: string
    isOpen?: boolean 
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = (props) => {
    const {
        children,
        className,
        isOpen,
        onClose,
        lazy 
    } = props;

    const {theme} = useTheme();

    const {
        close,
        isClosing,
        isMounted
    } = useModal({
        animationDelay: ANIMATION_DELAY, 
        onClose, 
        isOpen
    });

    const mods: ModsType = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    }

    if(lazy && !isMounted){
        return null; 
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme,'app_modal'])}>
                <Overlay className={cls.overlay} onClick={close}/>
                <div className={cls.content }>
                    {children}
                </div>
            </div> 
        </Portal>    
    )
}
