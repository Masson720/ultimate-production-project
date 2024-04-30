import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Icon.module.scss';
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    className?: string
    inverted?: boolean
}

export const Icon = (props: IconProps) => {
    const {
        className,
        Svg,
        inverted,
        ...otherProps
    } = props;

    return (
        <Svg 
            className={classNames(cls.Icon, {[cls.inverted]: inverted}, [className])}
            {...otherProps}
        />)
}
