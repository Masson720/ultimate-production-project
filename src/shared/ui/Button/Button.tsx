import { ModsType, classNames } from "@/shared/lib/classNames/classNames";
import cls from './Button.module.scss';
import { ButtonHTMLAttributes, FC, memo } from "react";

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
} 

export enum ButtonSize {
  M = 'size_M',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ThemeButton
    square?: boolean
    size?: ButtonSize
    disabled?: boolean
}

export const Button:FC<ButtonProps> = memo((props) => {
  const {
    className, 
    children,
    theme = ThemeButton.OUTLINE,
    disabled,
    square,
    size = ButtonSize.L,
    ...otherProps
} = props;

const mods: ModsType = {
  [cls[theme]]: true,
  [cls.square]: square,
  [cls[size]]: true,
  [cls.disabled]: disabled
}

  return (<button 
            className={classNames(cls.Button, mods, [className])} 
            disabled={disabled}
            {...otherProps}
        >
          {children}
        </button>)
}) 