import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button/Button";
import cls from './LoginForm.module.scss';
import { Input } from "shared/ui/Input/Input";

export const LoginForm = () => {
    const {t} = useTranslation()
    return (<div className={cls.LoginForm}>
        <Input 
            type='text'
            autoFocus
            className={cls.input}
            placeholder={t('Введите логин')}/>
        <Input 
            type='text' 
            className={cls.input}
            placeholder={t('Введите пароль')}/>
        <Button className={cls.loginBtn }>{t('Войти')}</Button>
    </div>)
}
