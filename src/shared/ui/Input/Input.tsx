import { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react";
import cls from './Input.module.scss';
import { classNames } from "shared/lib/classNames/classNames";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string 
    placeholder?: string
    onChange?: (value: string) => void
    autoFocus?: boolean
    type?: string
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        autoFocus,
        type = 'text',
        ...otherProps 
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0); 
    const onBlur = () => {
        setIsFocused(false);
    }

    const onFocus = () => {
        setIsFocused(true);
    }

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0 )
    }

    useEffect(() => {
        if(autoFocus){
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autoFocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length); 
    }

    return (<div className={cls.InputWrapper}>
        {placeholder && (<div className={cls.placeholder}>
            {`${placeholder} >`}
        </div>)}
        <div className={classNames(cls.caretWrapper, {}, [className])}>
            <input
                ref={ref} 
                className={cls.input}
                type={type}
                value={value}
                onChange={onChangeHandler}
                onFocus={onFocus}
                onBlur={onBlur}
                onSelect={onSelect}
                {...otherProps}
            /> 
        {isFocused && (<span className={cls.caret} style={{left: `${caretPosition * 9}px`}}/>)}             
        </div> 
    </div>)
}) 
