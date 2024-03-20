import { FC, memo, useMemo, useState } from "react";
import cls from './Sidebar.module.scss';
import { classNames } from "shared/lib/classNames/classNames";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import { Button, ButtonSize, ThemeButton } from "shared/ui/Button/Button";
import { SidebarItemsList } from "widgets/Sidebar/model/items";
import { SidebarItem } from "widgets/Sidebar/SidebarItem/SidebarItem";

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = memo(() => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  const itemsList = useMemo(() => {
    return (
        SidebarItemsList.map((item) => (
            <SidebarItem
                item={item}
                collapsed={collapsed}
                key={item.path}
            />
        ))
    )
  }, [collapsed])

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
            {itemsList}
        </div>
        <div className={cls.switchers}>
            <ThemeSwitcher/>
            <LangSwitcher className={cls.lang} short={collapsed}/>
        </div>
    </div>)
}) 
