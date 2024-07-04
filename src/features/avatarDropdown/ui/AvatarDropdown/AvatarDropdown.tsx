import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "@/entities/User";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar/Avatar";
import { Dropdown as DropdownDeprecated } from "@/shared/ui/deprecated/Popups";
import cls from './AvatarDropdown.module.scss';
import { getRouteAdminPanel, getRouteProfile, getRouteSettings } from "@/shared/const/router";
import { ToggleFeatures } from "@/shared/features";
import { Dropdown } from "@/shared/ui/redesigned/Popups";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";


export const AvatarDropdown = () => {
    const {t} = useTranslation();
    const authData = useSelector(getUserAuthData); 
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const isAdminPanelAvailable = isAdmin || isManager;
    const dispatch = useAppDispatch();

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [])

    if(!authData){
        return null;
    }

    const dropdownItems = [
        ...(isAdminPanelAvailable ? [{
            content: t('Админ панель'),
            href: getRouteAdminPanel()
        }]: []),
        {
            content: t('Профиль'),
            href: getRouteProfile(authData?.id)
        },
        {
            content: t('Настройки'),
            href: getRouteSettings()
        },
        {
            content: t('Выйти'),
            onClick: onLogout
        }
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <DropdownDeprecated
                    className={cls.dropdown}
                    direction="bottom left"
                    items={dropdownItems} 
                    trigger={<AvatarDeprecated size={30} fallbackInverted src={authData.avatar}/>}
                />                  
            }
            on={
                <Dropdown
                    className={cls.dropdown} 
                    direction="bottom left"
                    items={dropdownItems} 
                    trigger={<Avatar size={40} src={authData.avatar}/>}
                />                  
            }
        />
 
    )
}
