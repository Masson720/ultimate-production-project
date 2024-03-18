import { useTranslation } from "react-i18next";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import cls from './LoginForm.module.scss';
import { Input } from "shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { loginActions } from "features/AuthByUsername/model/slice/loginSlice";
import { getLoginState } from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { Text, TextTheme } from "shared/ui/Text/Text";

export const LoginForm = memo(() => {
    const {t} = useTranslation();

    const dispatch = useDispatch();
    const {username, password, error, isLoading } = useSelector(getLoginState);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch]);

    const onLoginClick  = useCallback(() => {
        dispatch(loginByUsername({username, password}));
    }, [dispatch, password, username]);

    return (<div className={cls.LoginForm}>
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
    </div>)
});
