import { useTranslation } from "react-i18next";
import cls from './LoginForm.module.scss';
import { useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { loginActions, loginReducer } from "@/features/AuthByUsername/model/slice/loginSlice";
import { loginByUsername } from "@/features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { getLoginUsername } from "@/features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "@/features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "@/features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "@/features/AuthByUsername/model/selectors/getLoginError/getLoginError";
import { ReducersList, DynamicModuleLoader } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { Button as ButtonDeprecated, ThemeButton } from "@/shared/ui/deprecated/Button/Button";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { ToggleFeatures } from "@/shared/features";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Card } from "@/shared/ui/redesigned/Card/Card";

export interface LoginFormProps {
    className?: string
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}

const LoginForm = memo(({className, onSuccess }: LoginFormProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);


    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch]);

    const onLoginClick  = useCallback( async () => {
        const result = await dispatch(loginByUsername({username, password}));
        if(result.meta.requestStatus === 'fulfilled'){
            onSuccess();
        }
    }, [onSuccess, dispatch, password, username]);

    return (
            <DynamicModuleLoader
                removeAfterUnmount={true} 
                reducers={initialReducers}
            >
                <ToggleFeatures
                    feature='isAppRedesigned'
                    off={
                        <div className={cls.LoginForm}>
                            <Text title={t('Форма авторизации')}/>
                            {error && (<TextDeprecated text={t('Неверный логин или пароль')} theme={TextTheme.ERROR}/>)} 
                            <InputDeprecated 
                                type='text'
                                autoFocus
                                onChange={onChangeUsername}
                                value={username}
                                className={cls.input}
                                placeholder={t('Введите логин')}/>
                            <InputDeprecated 
                                type='text'
                                onChange={onChangePassword}
                                value={password}
                                className={cls.input}
                                placeholder={t('Введите пароль')}/>
                            <ButtonDeprecated 
                                theme={ThemeButton.OUTLINE}
                                className={cls.loginBtn}
                                onClick={onLoginClick}
                                disabled={isLoading} 
                            >
                                {t('Войти')}
                            </ButtonDeprecated>
                        </div>
                    }
                    on={
                        <Card padding="24" className={cls.LoginForm}>
                            <VStack gap='16'>
                                <Text title={t('Форма авторизации')}/>
                                {error && (<Text text={t('Неверный логин или пароль')} variant="error"/>)} 
                                <Input 
                                    type='text'
                                    autoFocus
                                    onChange={onChangeUsername}
                                    value={username}
                                    className={cls.input}
                                    placeholder={t('Введите логин')}/>
                                <Input 
                                    type='text'
                                    onChange={onChangePassword}
                                    value={password}
                                    className={cls.input}
                                    placeholder={t('Введите пароль')}/>
                                <Button 
                                    variant='outline'
                                    className={cls.loginBtn}
                                    onClick={onLoginClick}
                                    disabled={isLoading} 
                                >
                                    {t('Войти')}
                                </Button>                                
                            </VStack>

                        </Card>
                    }
                />
            </DynamicModuleLoader>)
});


export default LoginForm;