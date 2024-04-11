import { ReactNode, useCallback } from 'react';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';
import { classNames } from 'shared/lib/classNames/classNames';

export interface TabItem {
    value: string
    content: ReactNode
}

interface TabsProps {
    className?: string
    tabs: TabItem[]
    value: string
    onTabClick: (tab: TabItem) => void
}

export const Tabs = (props: TabsProps) => {
    const {
        className,
        tabs,
        value,
        onTabClick 
    } = props;

    const clickHandler = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab);
        }
    }, [])

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map(tab => (
                <Card 
                    className={cls.tab} 
                    key={tab.value}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    onClick={clickHandler(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    )
}
