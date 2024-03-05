import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "shared/ui/Button/Button";
import cls from './PageError.module.scss';
import { classNames } from "shared/lib/classNames/classNames";

export const PageError: FC = () => {
    const {t} = useTranslation();

    const reloadPage = () => {
        location.reload();
    }

    return (<div className={classNames(cls.PageError)}>
        <p>{t('Произошла непредвиденная ошибка')}</p>
        <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
    </div>)
}
