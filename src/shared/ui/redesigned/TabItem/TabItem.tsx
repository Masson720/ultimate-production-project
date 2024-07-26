import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../Card/Card';
import { useCallback } from 'react';
import cls from './TabItem.module.scss';
import { TabItem } from '../Tabs/Tabs';

interface TabItemProps {
    className?: string
    tab: TabItem
    isSelected: boolean
    onClick: (tab: TabItem) => void
}

export const TabItemButton = (props: TabItemProps) => {
    const {
        tab,
        isSelected,
        className,
        onClick
    } = props;

    return (
        <Card 
            className={classNames(cls.TabItem, {[cls.selected]: isSelected}, [className])}
            key={tab.value}
            variant={isSelected ? 'light' : 'normal'}
            onClick={() => onClick(tab)}
            border='round'
        >
            {tab.content}
        </Card>
    )
}