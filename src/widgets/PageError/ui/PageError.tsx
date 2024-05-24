import { FC } from "react"
import { useTranslation } from "react-i18next"
import cls from './PageError.module.scss';
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/deprecated/Button/Button";

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
