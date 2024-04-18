import { Currency } from "entities/Currency/model/types/currency"
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next"
import { ListBox } from "shared/ui/ListBox/ListBox";

const options = [
    {value: Currency.RUB, content: Currency.RUB},
    {value: Currency.EUR, content: Currency.EUR},
    {value: Currency.USD, content: Currency.USD},
]

interface CurrencySelectProps {
    className?: string
    value?: Currency
    onChange?: (value: Currency) => void
    readonly?: boolean
}

export const CurrencySelect = memo(({className, value, onChange, readonly}: CurrencySelectProps) => {

    const {t} = useTranslation('profile');

    const onChangehandler = useCallback((value: string) => {
        onChange?.(value as Currency) ;
    }, [onChange])

    return (
        <ListBox 
            value={value}
            readonly={readonly}
            defaultValue={t('Укажите валюту')}
            label={t('Укажите валюту')}
            items={options} 
            onChange={onChangehandler}
            direction="top"
        />
    )
})
