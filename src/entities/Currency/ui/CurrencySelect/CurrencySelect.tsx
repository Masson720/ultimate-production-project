import { Currency } from "entities/Currency/model/types/currency"
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next"
import { Select } from "shared/ui/Select/Select"

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
        <Select
            label={t('Укажите валюту')}
            options={options}
            value={value}
            onChange={onChangehandler}
            readonly={readonly}
    />)
})
