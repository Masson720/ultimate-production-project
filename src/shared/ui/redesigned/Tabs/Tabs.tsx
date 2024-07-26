import { ReactNode } from 'react';
import cls from './Tabs.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';
import { TabItemButton } from '../TabItem/TabItem';

export interface TabItem {
    value: string
    content: ReactNode
}

interface TabsProps {
    className?: string 
    tabs: TabItem[]
    value: string
    onTabClick: (tab: TabItem) => void
    direction?: FlexDirection
}

export const Tabs = (props: TabsProps) => {
    const {
        className,
        tabs,
        value,
        onTabClick,
        direction = 'row' 
    } = props;

    return (
        <Flex 
            direction={direction} 
            gap='8'
            align='start'
            className={classNames(cls.Tabs, {}, [className])}
        >
            {tabs.map(tab => {
                const isSelected = tab.value === value;
                return (
                    <TabItemButton
                        isSelected={isSelected}
                        onClick={onTabClick}
                        tab={tab}
                    />
                )
            })}
        </Flex>
    )
}
