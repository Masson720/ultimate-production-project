import { useTheme } from "app/providers/ThemeProvider";
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { ModsType } from "shared/lib/classNames/classNames";


interface UseModalProps {
    onClose?: () => void
    isOpen?: boolean
    lazy?: boolean
    animationDelay: number
}

export function useModal({animationDelay, lazy, isOpen, onClose}: UseModalProps) {

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        if(isOpen){
            setIsMounted(true); 
        }
    }, [isOpen])

    const close = useCallback(() => {
        if(onClose){
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if(e.key === 'Escape'){
            close();
        }
    }, [close, animationDelay])

    useEffect(() => {
        if(isOpen){
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        }
    }, [isOpen, onKeyDown]);

    return {
        isClosing,
        isMounted,
        close,
    }
}