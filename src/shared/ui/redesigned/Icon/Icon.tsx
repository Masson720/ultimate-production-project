import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Icon.module.scss';
import React from "react";

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    className?: string
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false
}

interface ClickableIconBaseProps extends IconBaseProps {
    clickable: true
    onClick: () => void
}

type IconProps = NonClickableIconProps | ClickableIconBaseProps

export const Icon = (props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        ...otherProps
    } = props;

    const icon = (
        <Svg 
            className={classNames(cls.Icon, {}, [className])}
            width={width}
            height={height}  
            {...otherProps}
            onClick={undefined}
        />
    )

    if(clickable){
        return (
            <button 
                type='button' 
                className={cls.button} 
                onClick={props.onClick}
                style={{width, height}}
            >
                {icon}            
            </button>
        )
    }

    return icon;
}
