import { ModsType, classNames } from "../../lib/classNames/classNames";
import cls from './Modal.module.scss';
import { FC, MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "../Portal/Portal";
import { useTheme } from "app/providers/ThemeProvider";
import { Overlay } from "../Overlay/Overlay";

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

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const {theme} = useTheme();

    useEffect(() => {
        if(isOpen){
            setIsMounted(true); 
        }
    }, [isOpen])

    const closeHandler = useCallback(() => {
        if(onClose){
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY)
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if(e.key === 'Escape'){
            closeHandler();
        }
    }, [closeHandler])

    useEffect(() => {
        if(isOpen){
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        }
    }, [isOpen, onKeyDown]);

 

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
                <Overlay className={cls.overlay} onClick={closeHandler}/>
                <div className={cls.content }>
                    {children}
                </div>
            </div> 
        </Portal>    
    )
}
