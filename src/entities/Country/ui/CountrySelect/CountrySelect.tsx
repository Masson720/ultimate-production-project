import { Country } from "@/entities/Country/model/types/country";
import { ListBox } from "@/shared/ui/deprecated/Popups";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

const options = [
    {value: Country.Armenia, content: Country.Armenia},
    {value: Country.Belarus, content: Country.Belarus},
    {value: Country.Kazakhstan, content: Country.Kazakhstan},
    {value: Country.Russia, content: Country.Russia},
    {value: Country.Ukraine, content: Country.Ukraine},
    
]

interface CountrySelectProps {
    className?: string
    value?: Country
    onChange?: (value: Country) => void
    readonly?: boolean
}

export const CountrySelect = memo(({className, value, onChange, readonly}: CountrySelectProps) => {
    const {t} = useTranslation('profile');

    const onChangehandler = useCallback((value: string) => {
        onChange?.(value as Country) ;
    }, [onChange]);

    return (
        <ListBox 
            value={value}
            readonly={readonly}
            defaultValue={t('Укажите страну')}
            label={t('Укажите страну')} 
            items={options} 
            onChange={onChangehandler}
            direction="top right"
        />
    )
})
