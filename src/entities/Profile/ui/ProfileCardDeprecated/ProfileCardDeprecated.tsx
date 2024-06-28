import { memo } from "react";
import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from "../ProfileCard/ProfileCard";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar/Avatar";
import { ModsType, classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { TextAlign, Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Loader } from "@/shared/ui/deprecated/Loader/Loader";
import { CountrySelect } from "@/entities/Country";
import { CurrencySelect } from "@/entities/Currency";

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation();

    return (
        <HStack 
            justify="center" 
            max className={classNames(cls.ProfileCard, {}, [cls.error])}
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    )
}

export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack 
            justify="center" 
            max 
            className={classNames(cls.ProfileCard, {}, [cls.loading])} 
        >
            <Loader/>
        </HStack>
    )
}

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
    const {
        data, 
        isLoading, 
        error,
        readonly,
        className,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCountry,
        onChangeCurrency
    } = props;

    const {t} = useTranslation('profile');

    const mods: ModsType = {
        [cls.editing]: !readonly
    }

    return (
        <VStack 
            gap='16' 
            max
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && 
                <HStack 
                    justify="center" 
                    max 
                    className={cls.avatarWrapper}
                >
                    <AvatarDeprecated
                        src={data.avatar}
                        size={150}
                    />
                </HStack>
            }
            <InputDeprecated
                value={data?.first }
                placeholder={t('Ваше имя')}
                onChange={onChangeFirstname}
                readonly={readonly}
                className={cls.input}
                data-testid='ProfileCard.firstname'
            />
            <InputDeprecated
                value={data?.lastname }
                placeholder={t('Ваша фамилия')}
                onChange={onChangeLastname}
                readonly={readonly}
                className={cls.input}
                data-testid='ProfileCard.lastname'              
            />
            <InputDeprecated
                value={data?.age }
                placeholder={t('Возраст')}
                onChange={onChangeAge}
                readonly={readonly}
                className={cls.input}                
            />
            <InputDeprecated
                value={data?.city }
                placeholder={t('Город')}
                onChange={onChangeCity}
                readonly={readonly}
                className={cls.input}               
            />
            <InputDeprecated
                value={data?.username }
                placeholder={t('Введите имя пользователя')}
                onChange={onChangeUsername}
                readonly={readonly}
                className={cls.input}               
            />
            <InputDeprecated
                value={data?.avatar }
                placeholder={t('Введите ссылку на аватар')}
                onChange={onChangeAvatar}
                readonly={readonly}
                className={cls.input}               
            />
            <CurrencySelect 
                value={data?.currency}
                className={cls.input}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                value={data?.country}
                className={cls.input}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>                
    )
})
