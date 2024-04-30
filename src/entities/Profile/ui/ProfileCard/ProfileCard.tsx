import { useTranslation } from "react-i18next";
import { Text, TextAlign, TextTheme } from "@/shared/ui/Text/Text";
import cls from './ProfileCard.module.scss';
import { Input } from "@/shared/ui/Input/Input";
import { Profile } from "@/entities/Profile/model/types/profile";
import { Loader } from "@/shared/ui/Loader/Loader";
import { ModsType, classNames } from "@/shared/lib/classNames/classNames";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Currency, CurrencySelect } from "@/entities/Currency";
import { Country, CountrySelect } from "@/entities/Country";
import { HStack, VStack } from "@/shared/ui/Stack";

interface ProfileCardProps {
    className?: string
    data?: Profile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    onChangeFirstname?: (value?: string) => void
    onChangeLastname?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeCity?: (value?: string) => void
    onChangeUsername?: (value?: string) => void
    onChangeAvatar?: (value?: string) => void
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
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

    if(isLoading){
        return( 
            <HStack 
                justify="center" 
                max 
                className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
            >
                <Loader/>
            </HStack>
        )
    }

    if(error){
        return( 
            <HStack 
                justify="center" 
                max className={classNames(cls.ProfileCard, {}, [className, cls.error])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        )
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
                        <Avatar 
                            src={data.avatar}
                            size={150}
                        />
                    </HStack>
                }
                <Input
                    value={data?.first }
                    placeholder={t('Ваше имя')}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                    className={cls.input}
                    data-testid='ProfileCard.firstname'
                />
                <Input
                    value={data?.lastname }
                    placeholder={t('Ваша фамилия')}
                    onChange={onChangeLastname}
                    readonly={readonly}
                    className={cls.input}
                    data-testid='ProfileCard.lastname'              
                />
                <Input
                    value={data?.age }
                    placeholder={t('Возраст')}
                    onChange={onChangeAge}
                    readonly={readonly}
                    className={cls.input}                
                />
                <Input
                    value={data?.city }
                    placeholder={t('Город')}
                    onChange={onChangeCity}
                    readonly={readonly}
                    className={cls.input}               
                />
                <Input
                    value={data?.username }
                    placeholder={t('Введите имя пользователя')}
                    onChange={onChangeUsername}
                    readonly={readonly}
                    className={cls.input}               
                />
                <Input
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
}
