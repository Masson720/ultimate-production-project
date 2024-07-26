 import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback, useState } from "react";
import { LoginModal } from "@/features/AuthByUsername";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { NotificationButton } from "@/features/notificationButton";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { getRouteArticlesCreate } from "@/shared/const/router";
import { ToggleFeatures, toggleFeatures } from "@/shared/features";
import { Text, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { AppLink, AppLinkTheme } from "@/shared/ui/deprecated/AppLink/AppLink";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Button as ButtonDeprecated, ThemeButton } from "@/shared/ui/deprecated/Button/Button";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { CreateArticleButton } from "@/features/CreateArticleButton";


interface NavbarProps {
    className?: string
}


export const Navbar = memo(({className}: NavbarProps) => {
    const {t} = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData); 

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => cls.Navbar,
        on: () => cls.NavbarRedesigned
    })

    if(authData){
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <header  className={classNames(mainClass, {}, [className])}>
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
                    <header  className={classNames(mainClass, {}, [className])}>
                    <HStack gap='16' className={cls.actions}>
                        <CreateArticleButton/>
                        <NotificationButton/>
                        <AvatarDropdown/>           
                    </HStack>
                </header>                    
                }
            />
        )
    }

    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <ButtonDeprecated theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onShowModal}>
                        {t('Войти')}
                    </ButtonDeprecated>
                }
                on={
                    <Button variant='clear' className={cls.links} onClick={onShowModal}>
                        {t('Войти')}
                    </Button>
                }
            />
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal }/>
            )}
        </header>
    )
});