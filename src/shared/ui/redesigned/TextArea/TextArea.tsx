import { classNames } from "@/shared/lib/classNames/classNames";
import { HStack } from "../Stack";
import cls from './TextArea.module.scss';
import { useEffect, useRef, useState } from "react";

interface TextAreaProps {
    className?: string
    rows?: number
    cols?: number
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    autoFocus?: boolean
}

export const TextArea = (props: TextAreaProps) => {
    const {
        className,
        placeholder,
        rows,
        cols,
        value,
        autoFocus,
        onChange
    } = props;

    const ref = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);    

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    }
    
    const onBlur = () => {
        setIsFocused(false);
    }

    const onFocus = () => {
        setIsFocused(true);
    }

    useEffect(() => {
        if(autoFocus){
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autoFocus]);

    return (
        <HStack gap='8' max className={classNames(cls.TextArea, {[cls.focused]: isFocused}, [className])}>
            <textarea
                ref={ref}
                className={cls.textAreaBody}
                value={value} 
                onChange={onChangeHandler} 
                rows={rows}
                onBlur={onBlur}
                onFocus={onFocus} 
                cols={cols} 
                placeholder={placeholder}
            />
        </HStack>
    )
}
