import { ModsType, classNames } from "@/shared/lib/classNames/classNames";
import cls from './Avatar.module.scss';
import { CSSProperties, useMemo } from "react";
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Icon } from "../Icon/Icon";
import { Skeleton } from "../Skeleton/Skeleton";
import { AppImage } from "../../redesigned/AppImage";

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
    fallbackInverted?: boolean
}

/**
 * Устарел, используйте новые компоненты из папки redesigned
 * @deprecated
 */

export const Avatar = (props: AvatarProps) => {
    const {
        src, 
        className, 
        size = 100, 
        alt,
        fallbackInverted
    } = props;
    
    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size
        }
    }, [size])

    const mods: ModsType = {}
    const fallback = <Skeleton width={size} height={size} border="50%"/>
    const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon}/>
    
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
