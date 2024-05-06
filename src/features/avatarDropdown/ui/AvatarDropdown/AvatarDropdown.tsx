import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "@/entities/User";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Dropdown } from "@/shared/ui/Popups";
import cls from './AvatarDropdown.module.scss';
import { getRouteAdminPanel, getRouteProfile } from "@/shared/const/router";


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
            content: t('Выйти'),
            onClick: onLogout
        }
    ];

    return (
        <Dropdown
            className={cls.dropdown}
            direction="bottom left"
            items={dropdownItems} 
            trigger={<Avatar size={30} src={authData.avatar}/>}
        />   
    )
}
