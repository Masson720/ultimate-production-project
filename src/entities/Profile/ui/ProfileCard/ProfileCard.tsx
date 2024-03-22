import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData"
import { getProfileError } from "entities/Profile/model/selectors/getProfileError/getProfileError";
import { getProfileIsLoading } from "entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import cls from './ProfileCard.module.scss'
import { Input } from "shared/ui/Input/Input";



export const ProfileCard = () => {
    const {t} = useTranslation('profile')
    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    return (
        <div className={cls.ProfileCard}>
            <div className={cls.header}>
                <Text title={t('Профиль')}/> 
                <Button 
                    theme={ThemeButton.OUTLINE}
                    className={cls.editBtn}
                >{t('Редактировать')}</Button>
            </div>
            <div className={cls.data}>
                <Input
                    value={data?.first }
                    placeholder={t('Ваше имя')}
                    className={cls.input}
                />
                <Input
                    value={data?.lastname }
                    placeholder={t('Ваша фамилия')}
                    className={cls.input}                
                />
            </div>
        </div>
    )
}
