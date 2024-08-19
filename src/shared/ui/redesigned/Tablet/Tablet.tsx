import { Card } from "../Card/Card";
import { Text } from '../../../ui/redesigned/Text/Text';
import cls from './Tablet.module.scss';
import { classNames } from "@/shared/lib/classNames/classNames";

export type TabletTextColor = 'primary' | 'error';
export type TabletSize = 's' | 'm' | 'l';
export type TabletTextSize = 's' | 'm' | 'l';

interface TabletProps {
    className?: string
    message: string
    color?: TabletTextColor
    size?: TabletSize
    textSize?: TabletTextSize
}

const mapSizeToClass: Record<TabletSize, string> = {
    s: cls['size_s'],
    m: cls['size_m'],
    l: cls['size_l']
}

export const Tablet = (props: TabletProps) => {
    const {
        message,
        className,
        size = 'm',
        textSize = 'm'
    } = props;

    const sizeClass = mapSizeToClass[size];

    return (
        <Card className={classNames(cls.Tablet, {}, [sizeClass])}>
            <Text size={textSize} title={message}/>
        </Card>
    )
}