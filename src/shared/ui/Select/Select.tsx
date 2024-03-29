import { ModsType, classNames } from "shared/lib/classNames/classNames";
import cls from './Select.module.scss';
import { ChangeEvent, memo, useMemo } from "react";

export interface SelectOptions {
    value: string
    content: string
}

interface SelectProps {
    className?: string
    label: string
    options?: SelectOptions[]
    value?: string
    readonly?: boolean
    onChange?: (value: string) => void
}

export const Select = memo((props: SelectProps) => {
    const {
        className, 
        label, 
        options, 
        onChange,
        value,
        readonly
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement >) => {
        onChange?.(e.target.value); 
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
})