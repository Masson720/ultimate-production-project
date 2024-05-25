import cls from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../model/types/SidebarTypes';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';
import { ToggleFeatures } from '@/shared/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';

interface SidebarItemProps {
    item: SidebarItemType
    collapsed: boolean
     
}

export const SidebarItem = memo(({item, collapsed}: SidebarItemProps) => {
    const {t} = useTranslation();
    const isAuth = useSelector(getUserAuthData);
    if(item.authOnly && !isAuth){
        return null
    }
    
    return (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <AppLink 
                        variant={'primary'}
                        className={classNames(cls.itemRedesigned, {[cls.collapsedRedesigned]: collapsed})}
                        to={item.path} 
                        activeClassName={cls.active}
                    >
                        <Icon Svg={item.Icon}/>
                        <span className={cls.link}>{t(item.text)}</span>
                    </AppLink>                    
                }
                off={
                    <AppLinkDeprecated 
                        theme={AppLinkTheme.SECONDARY}
                        className={classNames(cls.item, {[cls.collapsed]: collapsed})}
                        to={item.path} 
                    >
                        <item.Icon className={cls.icon}/>
                        <span className={cls.link}>{t(item.text)}</span>
                    </AppLinkDeprecated>                    
                }
            />
        )
});
