import { useTranslation } from "react-i18next";
import { Text as TextDeprecated, TextAlign, TextTheme } from "@/shared/ui/deprecated/Text/Text";
import cls from './ProfileCard.module.scss';
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import { Profile } from "@/entities/Profile/model/types/profile";
import { Loader } from "@/shared/ui/deprecated/Loader/Loader";
import { ModsType, classNames } from "@/shared/lib/classNames/classNames";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar/Avatar";
import { Currency, CurrencySelect } from "@/entities/Currency";
import { Country, CountrySelect } from "@/entities/Country";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { ToggleFeatures } from "@/shared/features";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { ProfileCardDeprecated, ProfileCardDeprecatedLoader } from "../ProfileCardDeprecated/ProfileCardDeprecated";
import { ProfileCardRedesigned, ProfileCardRedesignedSkeleton } from "../ProfileCardRedesigned/ProfileCardRedesigned";

export interface ProfileCardProps {
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
        isLoading, 
        error,
        className
    } = props;

    const {t} = useTranslation('profile');

    if(isLoading){
        return(
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<ProfileCardDeprecatedLoader/>}
                on={<ProfileCardRedesignedSkeleton/>}
            />
            
        )
    }

    if(error){
        return( 
            <HStack 
                justify="center" 
                max className={classNames(cls.ProfileCard, {}, [className, cls.error])}
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

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <ProfileCardDeprecated {...props}/>
            }
            on={
                <ProfileCardRedesigned {...props}/>
            }
        />
    )
}
