import { FC, useState } from "react";
import cls from './Sidebar.module.scss';
import { classNames } from "shared/lib/classNames/classNames";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const {
    className
  } = props;

  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  return (<div data-testid='sidebar' className={classNames(cls.Sidebar, {[cls.collapsed] : collapsed}, [])}>
    <button data-testid='sidebar-toggle' onClick={onToggle}>Toggle</button>
    <div className={cls.switchers}>
        <ThemeSwitcher/>
        <LangSwitcher className={cls.lang}/>
    </div>
  </div>)
}
