import { ModsType, classNames } from "@/shared/lib/classNames/classNames";
import cls from './Select.module.scss';
import { ChangeEvent, useMemo } from "react";

export interface SelectOptions<T extends string> {
    value: T
    content: string 
}

interface SelectProps<T extends string> {
    className?: string
    label: string
    options?: SelectOptions<T>[]
    value?: T
    readonly?: boolean
    onChange?: (value: T) => void 
}

/**
 * Устарел, используйте новые компоненты из папки redesigned
 * @deprecated
 */

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className, 
        label, 
        options, 
        onChange,
        value,
        readonly
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement >) => {
        onChange?.(e.target.value as T); 
    }

    const optionsList = useMemo(() => {
        return options?.map(opt  => (
            <option
                className={cls.option}
                value={opt.value}
                key={opt.value} 
            >
                {opt.content }
            </option>
        ))
    }, [options]);
 
    const mods: ModsType = {

    }

    return (<div className={classNames(cls.Wrapper, mods, [className])}>
        {label && (<span className={cls.label }>{`${label} >`}</span>)}
        <select 
            disabled={readonly}
            className={cls.select} 
            value={value}
            onChange={onChangeHandler}
        >
            {optionsList}
        </select>
    </div>)
}