import { FC, memo, useMemo, useState } from "react";
import cls from './Sidebar.module.scss';
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonSize, ThemeButton } from "@/shared/ui/Button/Button";
import { SidebarItem } from "../../SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import { VStack } from "@/shared/ui/Stack/VStack/VStack";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { LangSwitcher } from "@/features/LangSwitcher";

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = memo(() => {
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
    </aside>)
}) 
