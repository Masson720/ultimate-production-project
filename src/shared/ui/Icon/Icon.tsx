import { classNames } from "shared/lib/classNames/classNames";
import cls from './Icon.module.scss';



interface IconProps {
    Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    className?: string
    inverted?: boolean
}

export const Icon = (props: IconProps) => {
    const {
        className,
        Svg,
        inverted
    } = props;

    return (<Svg className={classNames(cls.Icon, {[cls.inverted]: inverted}, [className])}/>)
}
