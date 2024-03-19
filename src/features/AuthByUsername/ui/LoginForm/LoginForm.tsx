import { useTranslation } from "react-i18next";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import cls from './LoginForm.module.scss';
import { Input } from "shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { loginActions, loginReducer } from "features/AuthByUsername/model/slice/loginSlice";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { getLoginUsername } from "features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "features/AuthByUsername/model/selectors/getLoginError/getLoginError";
import { ReducersList, DynamicModuleLoader } from "shared/lib/components/DynamicModule/DynamicModuleLoader";

export interface LoginFormProps {
    className?: string
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}

const LoginForm = memo((props: LoginFormProps) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
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

    const onLoginClick  = useCallback(() => {
        dispatch(loginByUsername({username, password}));
    }, [dispatch, password, username]);

    return (<DynamicModuleLoader
        removeAfterUnmount={true} 
        reducers={initialReducers}
            >
                <div className={cls.LoginForm}>
                    <Text title={t('Форма авторизации')}/>
                    {error && (<Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR}/>)} 
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
                        theme={ThemeButton.OUTLINE}
                        className={cls.loginBtn}
                        onClick={onLoginClick}
                        disabled={isLoading} 
                    >
                        {t('Войти')}
                    </Button>
                </div>
            </DynamicModuleLoader>)
});


export default LoginForm;