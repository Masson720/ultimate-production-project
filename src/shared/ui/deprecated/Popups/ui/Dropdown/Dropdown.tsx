import { Menu } from "@headlessui/react";
import cls from './Dropdown.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { classNames } from "@/shared/lib/classNames/classNames";
import { Fragment, ReactNode } from "react";
import { DropdownDirection } from "@/shared/types/ui";
import { mapDirectionClass } from "../../styles/consts";
import { AppLink } from "../../../AppLink/AppLink";

interface DropdownItem {
    disabled?: boolean
    content?: ReactNode
    onClick?: () => void
    href?: string
}

interface DropdownProps {
    className?: string
    items: DropdownItem[]
    trigger?: ReactNode
    direction?: DropdownDirection
}

/**
 * Устарел, используйте новые компоненты из папки redesigned
 * @deprecated
 */

export function Dropdown(props: DropdownProps) {
    const {
        className,
        trigger,
        items,
        direction = 'bottom right'
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu as='div' className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}>
            <Menu.Button className={popupCls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index)=> {
                    const content = ({active}: {active: boolean}) => (
                        <button
                            type={'button'}
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, {[popupCls.active]: active}, [className])}
                        >
                            {item.content}
                        </button>
                    )
                    
                    if(item.href){
                        
                        return (
                            <Menu.Item 
                                as={AppLink} 
                                key={`dropdown-key-${index}`}
                                to={item.href} 
                                disabled={item.disabled} 
                            > 
                                {content}
                            </Menu.Item>  
                        )
                    }

                    return (
                        <Menu.Item 
                            as={Fragment} 
                            key={`dropdown-key-${index}`}
                            disabled={item.disabled} 
                        > 
                            {content}
                        </Menu.Item>  
                    )                  
                })}              
            </Menu.Items>
        </Menu>
    )
}
