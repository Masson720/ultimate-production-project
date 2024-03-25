import { ModsType, classNames } from "shared/lib/classNames/classNames";
import cls from './Avatar.module.scss';
import { CSSProperties, useMemo } from "react";

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
}

export const Avatar = ({src, className, size, alt}: AvatarProps) => {
    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size
        }
    }, [size])

    const mods: ModsType = {}
    
    return (
    <img 
        src={src}
        alt={alt}
        style={styles}
        className={classNames(cls.Avatar, mods, [className])}/>)
}
