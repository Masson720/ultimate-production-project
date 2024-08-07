import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cls from './Flex.module.scss';
import { ModsType, classNames } from "@/shared/lib/classNames/classNames";

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '24' | '32';
export type FlexMargin = '4' | '8' | '16' | '24' | '32';
export type FlexWrap = 'wrap' | 'nowrap';

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
}

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
}

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumm
}

const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    24: cls.gap24,
    32: cls.gap32,
}

const marginClasses: Record<FlexGap, string> = {
    4: cls.margin4,
    8: cls.margin8,
    16: cls.margin16,
    24: cls.margin24,
    32: cls.margin32,
}

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface FlexProps extends DivProps {
    className?: string
    children: ReactNode
    justify?: FlexJustify
    align?: FlexAlign
    direction?: FlexDirection
    gap?: FlexGap
    max?: boolean
    margin?: FlexMargin
    wrap?: FlexWrap
}

export const Flex = (props: FlexProps ) => {
    const {
        className, 
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        max,
        margin,
        wrap = 'nowrap',
        ...otherProps
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        cls[wrap],
        gap && gapClasses[gap],
        margin && marginClasses[margin]
    ]

    const mods: ModsType = {
        [cls.max]: max
    }

    return (
        <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    )
}
