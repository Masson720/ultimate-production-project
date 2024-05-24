import { Fragment, ReactNode, useState } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';

interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}


interface ListBoxProps { 
    items: ListBoxItem[]
    className?: string
    value?: string
    label?: string
    defaultValue?: string
    onChange: (valie: string) => void
    readonly?: boolean
    direction?: DropdownDirection
} 

/**
 * Устарел, используйте новые компоненты из папки redesigned
 * @deprecated
 */

export function ListBox(props: ListBoxProps) {
    const {
        items,
        className,
        value,
        defaultValue,
        onChange,
        readonly,
        label,
        direction = 'bottom right' 
    } = props;

    const optionsClasses = [
        mapDirectionClass[direction]
    ]


    return (
        <HStack gap='4'>
            {label && <span>{`${label} >`}</span>}
            <HListbox 
                as='div'
                disabled={readonly}
                className={classNames(cls.ListBox, {}, [className, popupCls.popup])} 
                value={value} 
                onChange={onChange}
            > 
                <HListbox.Button className={cls.trigger}>  
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListbox.Button>
                <HListbox.Options className={classNames(cls.options, {}, optionsClasses)} >
                    {items?.map(item => (
                        <HListbox.Option
                            key={item.value} 
                            as={Fragment}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {({active, selected}) => (
                                <li className={classNames(cls.item, 
                                    {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled
                                })}>
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>

    )
}