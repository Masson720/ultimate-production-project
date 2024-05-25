import { memo, useMemo, useState } from "react";
import cls from './Sidebar.module.scss';
import { classNames } from "@/shared/lib/classNames/classNames";
import { SidebarItem } from "../../SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ToggleFeatures } from "@/shared/features";
import { Button, ButtonSize, ThemeButton } from "@/shared/ui/deprecated/Button/Button";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { AppLogo } from "@/shared/ui/redesigned/AppLogo";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

export const Sidebar = memo(() => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    const itemsList = useMemo(() => {
        return (
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            ))
        )
    }, [collapsed, sidebarItemsList]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <aside data-testid='sidebar' className={classNames(cls.Sidebar_Redesigned, {[cls.collapsedRedesigned] : collapsed}, [])}>
                    <AppLogo className={cls.appLogo} size={collapsed ? 30 : 50}/>
                    <VStack max role="navigation" className={cls.items}>
                        {itemsList}
                    </VStack>
                    <Icon 
                        data-testid='sidebar-toggle' 
                        onClick={onToggle}
                        className={cls.collapsedBtn}
                        Svg={ArrowIcon}
                        clickable
                    />
                    <div className={cls.switchers}>
                        <ThemeSwitcher/>
                        <LangSwitcher className={cls.lang} short={collapsed}/>
                    </div>
                </aside>                
            }
            off={
                <aside data-testid='sidebar' className={classNames(cls.Sidebar, {[cls.collapsed] : collapsed}, [])}>
                    <Button data-testid='sidebar-toggle' 
                        onClick={onToggle}
                        className={cls.collapsedBtn}
                        theme={ThemeButton.BACKGROUND_INVERTED}
                        square
                        size={ButtonSize.L}
                    >
                        {collapsed ? '>' : '<'}
                    </Button>
                    <VStack role="navigation" className={cls.items}>
                        {itemsList}
                    </VStack>
                    <div className={cls.switchers}>
                        <ThemeSwitcher/>
                        <LangSwitcher className={cls.lang} short={collapsed}/>
                    </div>
                </aside>                
            }
        />
    )
}) 
