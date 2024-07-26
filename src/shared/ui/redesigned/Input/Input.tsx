import { InputHTMLAttributes, ReactNode, memo, useEffect, useRef, useState } from "react";
import cls from './Input.module.scss';
import { ModsType, classNames } from "@/shared/lib/classNames/classNames";
import { HStack } from "../Stack";
import { Text } from '@/shared/ui/redesigned/Text/Text';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string | number
    label?: string
    placeholder?: string
    onChange?: (value: string) => void
    autoFocus?: boolean
    type?: string
    readonly?: boolean
    addonLeft?: ReactNode
    addonRight?: ReactNode
    size?: InputSize
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        autoFocus,
        type = 'text',
        readonly,
        label,
        addonLeft,
        addonRight,
        size = 'm',
        ...otherProps 
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

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

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }

    const mods: ModsType = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.addonLeft]: Boolean(addonLeft),
        [cls.addonRight]: Boolean(addonRight)
    }

    const input = (
        <div className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
            <div className={cls.addonLeft}>{addonLeft}</div>
                <input
                    ref={ref} 
                    className={cls.input}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    readOnly={readonly}
                    {...otherProps}
                />
            <div className={cls.addonRight}>{addonRight}</div>
        </div>        
    )

    if(label){
        return (
            <HStack max gap='8'>
                <Text text={label} />
                {input}
            </HStack>
        )        
    }
    return input;
}) 
