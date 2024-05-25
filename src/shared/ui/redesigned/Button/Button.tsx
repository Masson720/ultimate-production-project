import { ModsType, classNames } from "@/shared/lib/classNames/classNames";
import cls from './Button.module.scss';
import { ButtonHTMLAttributes, memo } from "react";

export type ButtonVariant = 'clear' | 'outline'


export type ButtonSize = 'size_M' | 'size_l' | 'size_xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: ButtonVariant
    square?: boolean
    size?: ButtonSize
    disabled?: boolean 
    fullWidth?: boolean
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
        size = 'size_l',
        ...otherProps
    } = props;

    const mods: ModsType = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth
    }

    return (
        <button 
              className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])} 
              disabled={disabled}
              {...otherProps}
        >
              {children}
        </button>
    )
}) 