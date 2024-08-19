import { Card } from "@/shared/ui/redesigned/Card/Card";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { useTranslation } from "react-i18next";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { memo, useCallback, useEffect, useState } from "react";

interface PasswordForm {
    onChange: (value: string) => void
}

export const PasswordForm = memo((props: PasswordForm) => {
    const {
        onChange
    } = props;

    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('')
    const [shortPasswordError, setShortPasswordError] = useState('');

    const validatePassword = useCallback(() => {
        let matchError = '';
        let lengthError = '';

        if (password !== passwordRepeat) {
            matchError = t('Пароли не совпадают');
        }

        if (password.length < 8) {
            lengthError = t('Пароль должен содержать минимум 8 символов');
        }

        setPasswordMatchError(matchError);
        setShortPasswordError(lengthError);

        if (!matchError && !lengthError) {
            onChange(password);
        }
    }, [password, passwordRepeat, passwordMatchError, shortPasswordError]);

    const onChangePassword = useCallback((value: string) => {
        setPassword(value);
    }, [password]);

    const onChangePasswordRepeat = useCallback((value: string) => {
        setPasswordRepeat(value);
    }, [passwordRepeat]);

    useEffect(() => {
        validatePassword()
    }, [password, passwordRepeat, validatePassword])

    return (
        <VStack max align="center">
            <Text title={t('Введите пароль для входа на сайт')} />
            {passwordMatchError && <Text variant="error" text={passwordMatchError} />}
            {shortPasswordError && <Text variant="error" text={shortPasswordError} />}
            <Card max padding="24">
                <HStack gap='16'>
                    <Input placeholder={t('Придумайте пароль')} onChange={onChangePassword} />
                    <Input placeholder={t('Повторите, чтобы не ошибиться')} onChange={onChangePasswordRepeat}/>
                </HStack>
            </Card>            
        </VStack>

    )
})