import { Popover as HPopover } from '@headlessui/react';
import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { DropdownDirection } from '@/shared/types/ui';
import { ReactNode } from 'react';
import { mapDirectionClass } from '../../styles/consts';
import { classNames } from '@/shared/lib/classNames/classNames';

interface PopoverProps {
    className?: string
    trigger?: ReactNode
    direction?: DropdownDirection
    children: ReactNode
}

export function Popover(props: PopoverProps) {
    const {
        className,
        direction = 'bottom right',
        trigger,
        children 
    } = props;

    const menuClasses = [mapDirectionClass[direction], popupCls.menu]; 

    return ( 
        <HPopover 
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
        >
            <HPopover.Button as={'div'} className={popupCls.trigger}>
                {trigger}
            </HPopover.Button> 

            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}> 
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}
