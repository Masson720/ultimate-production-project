import { classNames } from "shared/lib/classNames/classNames";
import cls from './Icon.module.scss';



interface IconProps {
    Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    className?: string
}

export const Icon = (props: IconProps) => {
    const {
        className,
        Svg
    } = props;

    return (<Svg className={classNames(cls.Icon, {}, [className])}/>)
}
