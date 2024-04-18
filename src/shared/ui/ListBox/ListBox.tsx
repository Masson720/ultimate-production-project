import { Fragment, ReactNode, useState } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import cls from './ListBox.module.scss';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';

interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

type DropdownDirection = 'top' | 'bottom';

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

const mapDirectionClass: Record<DropdownDirection, string> = {
    bottom: cls.optionsBottom,
    top: cls.optionsTop
}

export function ListBox(props: ListBoxProps) {
    const {
        items,
        className,
        value,
        defaultValue,
        onChange,
        readonly,
        label,
        direction = 'top' 
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
                className={classNames(cls.ListBox, {}, [className])} 
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
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled
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