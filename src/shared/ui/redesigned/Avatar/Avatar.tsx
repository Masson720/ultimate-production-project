import { ModsType, classNames } from "@/shared/lib/classNames/classNames";
import cls from './Avatar.module.scss';
import { CSSProperties, useMemo } from "react";
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Icon } from "../Icon/Icon";
import { AppImage } from "../../redesigned/AppImage";
import { Skeleton } from "../Skeleton/Skeleton";

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
}

export const Avatar = (props: AvatarProps) => {
    const {
        src, 
        className, 
        size = 100, 
        alt
    } = props;
    
    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size
        }
    }, [size])

    const mods: ModsType = {}
    const fallback = <Skeleton width={size} height={size} border="50%"/>
    const errorFallback = <Icon width={size} height={size} Svg={UserIcon}/>
    
    return (
        <AppImage 
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    )
}
