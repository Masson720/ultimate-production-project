import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { Icon } from '../../../Icon/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface ListBoxItem<T extends string> {
    value: T
    content: ReactNode
    disabled?: boolean
}

interface ListBoxProps<T extends string> { 
    items: ListBoxItem<T>[]
    className?: string
    value?: T
    label?: string
    defaultValue?: string
    onChange: (value: T) => void
    readonly?: boolean
    direction?: DropdownDirection
} 

export function ListBox<T extends string>(props: ListBoxProps<T>) {
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
        mapDirectionClass[direction],
        popupCls.menu
    ]

    const selectedItem = useMemo(() => {
        return items?.find(item => item.value === value)
    }, [items, value])

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
                <HListbox.Button 
                    as={Button} 
                    variant='filled' 
                    addonRight={<Icon Svg={ArrowIcon}/>}
                >  
                    {selectedItem?.content ?? defaultValue}
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
                                        [popupCls.disabled]: item.disabled,
                                        [popupCls.active]: selected
                                })}>
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