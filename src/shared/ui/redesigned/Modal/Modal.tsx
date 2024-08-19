import { ModsType, classNames } from "../../../lib/classNames/classNames";
import cls from './Modal.module.scss';
import { FC, ReactNode } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { Portal } from "../../redesigned/Portal/Portal";
import { Overlay } from "../../redesigned/Overlay/Overlay";
import { toggleFeatures } from "@/shared/features";

interface ModalProps {
    children?: ReactNode | ((close: () => void) => ReactNode);
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
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal', toggleFeatures({
                name: 'isAppRedesigned',
                off: () => cls.modalOld,
                on: () => cls.modalNew
            })])}>
                <Overlay className={cls.overlay} onClick={close}/>
                <div className={cls.content }>
                    {typeof children === 'function' ? children(close) : children}
                </div>
            </div> 
        </Portal>    
    )
}
