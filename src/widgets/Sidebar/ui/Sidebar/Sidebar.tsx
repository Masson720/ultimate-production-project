import { FC, useState } from "react";
import cls from './Sidebar.module.scss';
import { classNames } from "shared/lib/classNames/classNames";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import { Button, ButtonSize, ThemeButton } from "shared/ui/Button/Button";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import { RoutePath } from "shared/config/routeConfig/RouteConfig";
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = () => {
  const {t} = useTranslation()

  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  return (
    <div data-testid='sidebar' className={classNames(cls.Sidebar, {[cls.collapsed] : collapsed}, [])}>
        <Button data-testid='sidebar-toggle' 
            onClick={onToggle}
            className={cls.collapsedBtn}
            theme={ThemeButton.BACKGROUND_INVERTED}
            square
            size={ButtonSize.L}
          >
            {collapsed ? '>' : '<'}
        </Button>
        <div className={cls.items}>
            <div className={cls.item}>
                <AppLink 
                    theme={AppLinkTheme.SECONDARY} 
                    to={RoutePath.main} 
                >
                    <MainIcon className={cls.icon}/>
                    <span className={cls.link}>{t("Главная страница")}</span>
                </AppLink>
            </div>
            
            <div className={cls.item}>
                <AppLink 
                    theme={AppLinkTheme.SECONDARY} 
                    to={RoutePath.about}
                >
                    <AboutIcon className={cls.icon}/>
                    <span className={cls.link}>{t('О сайте')}</span>
                </AppLink>
            </div>
            
        </div>
        <div className={cls.switchers}>
            <ThemeSwitcher/>
            <LangSwitcher className={cls.lang} short={collapsed}/>
        </div>
    </div>)
}
