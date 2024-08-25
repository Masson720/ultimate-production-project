import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardHeight = 'base' | 'small' | 'middle' | 'big';
export type CardBorderRadius = 'round' | 'normal' | 'partial';
export type CardBorder = 'none' | 'solid';
 
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
    variant?: CardVariant
    max?: boolean
    padding?: CardPadding
    borderRadius?: CardBorderRadius
    border?: CardBorder
    height?: CardHeight
    fullHeigt?: boolean
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
}

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        max,
        padding = '8',
        borderRadius ='normal',
        border = 'none',
        height = 'base',
        fullHeigt,
        ...otherProps
    } = props;

    const paddingsClass = mapPaddingToClass[padding];

    const classList = [
        className, 
        cls[variant], 
        cls[height], 
        cls[paddingsClass], 
        cls[borderRadius],
        cls[border]
    ];

    const additionalClasses = {[cls.max]: max, [cls.fullHeigt]: fullHeigt}

    return (
        <div className={classNames(cls.Card, additionalClasses, classList)} {...otherProps}>
            {children}
        </div>
    )
 }
 