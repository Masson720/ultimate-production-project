 import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import { useTranslation } from "react-i18next";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { memo, useCallback, useState } from "react";
import { LoginModal } from "@/features/AuthByUsername";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { Text, TextTheme } from "@/shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { HStack } from "@/shared/ui/Stack";
import { NotificationButton } from "@/features/notificationButton";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { getRouteArticlesCreate } from "@/shared/const/router";
import { ToggleFeatures } from "@/shared/features";

interface NavbarProps {
    className?: string
}


export const Navbar = memo(({className}: NavbarProps) => {
    const {t} = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData); 

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, [])

    if(authData){
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <header  className={classNames(cls.Navbar, {}, [className])}>
                    <Text 
                        className={cls.appName}
                        theme={TextTheme.INVERTED}
                        title={'Ulbi TV App'}
                    />
                    <AppLink 
                        to={getRouteArticlesCreate()}
                        className={cls.createBtn}
                        theme={AppLinkTheme.SECONDARY}
                    >
                        {t('Создать статью')}
                    </AppLink>
                    <HStack gap='16' className={cls.actions}>
                        <NotificationButton/>
                        <AvatarDropdown/>           
                    </HStack>
                </header>                    
                }
                on={
                    <header  className={classNames(cls.NavbarRedesigned, {}, [className])}>
                    <HStack gap='16' className={cls.actions}>
                        <NotificationButton/>
                        <AvatarDropdown/>           
                    </HStack>
                </header>                    
                }
            />
        )
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onShowModal}>
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal }/>
            )}
        </header>
    )
});