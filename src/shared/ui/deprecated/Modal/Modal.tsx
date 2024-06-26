import { ModsType, classNames } from "../../../lib/classNames/classNames";
import cls from './Modal.module.scss';
import { FC, ReactNode } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { Portal } from "../../redesigned/Portal/Portal";
import { Overlay } from "../../redesigned/Overlay/Overlay";

interface ModalProps {
    children?: ReactNode
    className?: string
    isOpen?: boolean 
    onClose?: () => void
    lazy?: boolean
}

/**
 * Устарел, используйте новые компоненты из папки redesigned
 * @deprecated
 */

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

    console.log(theme);

    const mods: ModsType = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    }

    if(lazy && !isMounted){
        return null; 
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay className={cls.overlay} onClick={close}/>
                <div className={cls.content }>
                    {children}
                </div>
            </div> 
        </Portal>    
    )
}
