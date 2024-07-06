import { ModsType, classNames } from "@/shared/lib/classNames/classNames";
import cls from './Button.module.scss';
import { ButtonHTMLAttributes, ReactNode, memo } from "react";

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'size_M' | 'size_l' | 'size_xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: ButtonVariant
    square?: boolean
    size?: ButtonSize
    color?: ButtonColor
    disabled?: boolean 
    fullWidth?: boolean
    addonLeft?: ReactNode
    addonRight?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        /**
         * Содержимое кнопки
         */
        children,
        /**
         * Тема кнопки. Отвечает за визуал. 
         */
        variant = 'outline',
        /**
         * Флаг, отвечающий за работу кнопки
         */
        disabled,
        /**
         * Флаг, делающий кнопку квадратной
         */
        square,
        /**
         * Увеличивает кнопку на всю свободную ширину
         */
        fullWidth,
        /**
         * Размер кнопки в соответствии с дизайн системой
         */
        size = 'size_M',
        color = 'normal',
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const mods: ModsType = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight)
    }

    return (
        <button 
            className={classNames(cls.Button, mods, [className, cls[color], cls[variant], cls[size]])} 
            disabled={disabled}
            {...otherProps}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    )
}) 