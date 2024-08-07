import { LinkProps } from 'react-router-dom';
import cls from './AppLink.module.scss';
import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';

export type AppLinkVariant = 'primary' | 'red'

interface AppLinkProps extends LinkProps{
    className?: string
    variant?: AppLinkVariant
    activeClassName?: string
} 


export const AppLink: FC<AppLinkProps> = (props: AppLinkProps) => {
    const {
        className, 
        children, 
        variant = 'primary', 
        activeClassName = '', 
        to, 
        ...otherProps
    } = props;

    return (
        <NavLink
            to={to} 
            className={({isActive}) => classNames(cls.AppLink, {[activeClassName]: isActive}, [className, cls[variant]])} 
            {...otherProps}
        >
            {children}
        </NavLink>
    )
}