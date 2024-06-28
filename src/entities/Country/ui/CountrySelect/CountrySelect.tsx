import { Country } from "@/entities/Country/model/types/country";
import { ToggleFeatures } from "@/shared/features";
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { ListBox } from "@/shared/ui/redesigned/Popups";
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

    const props = {
        value: value,
        readonly: readonly,
        defaultValue: t('Укажите валюту'),
        label: t('Укажите валюту'),
        items: options ,
        onChange: onChangehandler,
        direction: "top right" as const
    }

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            off={
                <ListBoxDeprecated
                    {...props}
                />
            }
            on={
                <ListBox {...props} />
            }
    />
    )
})
