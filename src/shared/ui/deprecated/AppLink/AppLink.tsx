import { Link, LinkProps } from 'react-router-dom';
import cls from './AppLink.module.scss';
import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps{
    className?: string
    theme?: AppLinkTheme
} 

/**
 * Устарел, используйте новые компоненты из папки redesigned
 * @deprecated
 */

export const AppLink: FC<AppLinkProps> = memo(({className, children, theme = AppLinkTheme.PRIMARY, to, ...otherProps}) => {
  return (
    <Link 
        to={to} 
        className={classNames(cls.AppLink, {}, [className, cls[theme]])} 
        {...otherProps}
    >
        {children}
    </Link>
  )
})