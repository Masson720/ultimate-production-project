import { memo, Suspense, useCallback, useState } from "react";
import cls from './RegistrationForm.module.scss';
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { ProfileCard } from "@/entities/Profile";
import { useTranslation } from "react-i18next";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { PasswordForm } from "../PasswordForm/PasswordForm";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { registrationActions, registrationReducer } from "../../model/slice/RegistrationSlice";
import { getProfileForm, getSuccess, getValidateError } from "../../model/selectors/registrationSelectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ValidateRegistrationErrors } from "../../model/consts/consts";
import { registrationUserData } from "../../model/services/registrationUserData/registrationUserData";
import { Tablet } from "@/shared/ui/redesigned/Tablet/Tablet";
import { Loader } from "@/shared/ui/deprecated/Loader/Loader";
import { sendLog } from "@/shared/lib/sendLog/sendLog";
import { UserActions } from "@/shared/const/logs";

const reducers: ReducersList = {
    registrationForm: registrationReducer
}

interface RegistrationFormProps {
    className?: string
    onClose: () => void
}

const RegistrationForm = (props: RegistrationFormProps) => {
    const {
        className,
        onClose
    } = props;
    const dispatch = useAppDispatch();
    const success = useSelector(getSuccess);
    const profileForm = useSelector(getProfileForm);
    const validateErrors = useSelector(getValidateError);
    const { t } = useTranslation();

    const {
        setAge,
        setAvatar,
        setCity,
        setCountry,
        setCurrency,
        setFirstName,
        setLastName,
        setPassword,
        setUsername,
        setResetForm
    } = registrationActions;

    const validateErrorTranslates: Record<ValidateRegistrationErrors, string> = {
        [ValidateRegistrationErrors.INCORRECT_AGE]: t('Некорректно введен возраст'),
        [ValidateRegistrationErrors.INCORRECT_CITY]: t('Некорректно введен город'),
        [ValidateRegistrationErrors.INCORRECT_FIRSTNAME]: t('Некорректно введено имя'),
        [ValidateRegistrationErrors.INCORRECT_LASTNAME]: t('Некорректно введена фамилия'),
        [ValidateRegistrationErrors.INCORRECT_USERNAME]: t('Некорректно введен никнейм'),
        [ValidateRegistrationErrors.SHORT_PASSWORD]: t('Такой пароль не подходит'),
        [ValidateRegistrationErrors.SERVER_ERROR]: t('Серверная ошибка'),
        [ValidateRegistrationErrors.PASSWORD_MISSMATCH]: t('Пароли не совпадают'),
        [ValidateRegistrationErrors.NO_DATA]: t('Нет данных')
    }
    
    const onChangeAge = useCallback((value?: string) => {
        dispatch(setAge(Number(value)));
    }, [dispatch, setAge]);
    
    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(setAvatar(value));
    }, [dispatch, setAvatar]);
    
    const onChangeCity = useCallback((value?: string) => {
        dispatch(setCity(value));
    }, [dispatch, setCity]);
    
    const onChangeCountry = useCallback((value?: string) => {
        dispatch(setCountry(value));
    }, [dispatch, setCountry]);
    
    const onChangeCurrency = useCallback((value?: string) => {
        dispatch(setCurrency(value));
    }, [dispatch, setCurrency]);
    
    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(setFirstName(value));
    }, [dispatch, setFirstName]);
    
    const onChangeLastname = useCallback((value?: string) => {
        dispatch(setLastName(value));
    }, [dispatch, setLastName]);
    
    const onChangeUsername = useCallback((value?: string) => {
        dispatch(setUsername(value));
    }, [dispatch, setUsername]);
    
    const onChangePassword = useCallback((password: string) => {
        dispatch(setPassword(password));
    }, [dispatch, setPassword]);
    
    const onSubmitForm = useCallback(() => {
        dispatch(registrationUserData());
        sendLog(UserActions.REGISTRATION_USER, {
            userName: profileForm?.username
        })
    }, [dispatch]);

    const resetForm = useCallback(() => {
        onClose();
        dispatch(setResetForm());
    }, [dispatch])

    if(success){
        return (
            <Tablet message={t('Регистрация завершена')} size="m" textSize="l" />
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Suspense fallback={<Loader/>} >
                <VStack gap='16' margin="16">
                    <Card padding="16" max>
                        <Text size='l' title={t('Регистрация нового пользователя')}/>
                    </Card>
                    {validateErrors?.length && validateErrors.map(error => (
                        <Text key={error} variant="error" text={validateErrorTranslates[error]} />
                    ))}
                    <VStack align="center">
                        <Text title={t('Заполните карточку пользователя')}/>
                        <ProfileCard 
                            data={profileForm} 
                            className={cls.ProfileForm}
                            onChangeAge={onChangeAge}
                            onChangeAvatar={onChangeAvatar}
                            onChangeCity={onChangeCity}
                            onChangeCountry={onChangeCountry}
                            onChangeCurrency={onChangeCurrency}
                            onChangeFirstname={onChangeFirstname}
                            onChangeLastname={onChangeLastname}
                            onChangeUsername={onChangeUsername}
                        />         
                    </VStack>
                    <PasswordForm onChange={onChangePassword}/>
                    <Card padding='16' max>
                        <HStack gap='16' align="end">
                            <Button onClick={onSubmitForm} >{t('Зарегистрироваться')}</Button>
                            <Button color="error" onClick={resetForm} >{t('Отменить')}</Button>
                        </HStack>
                    </Card>
                </VStack>                  
            </Suspense>
        </DynamicModuleLoader>

    )
}

export default memo(RegistrationForm)