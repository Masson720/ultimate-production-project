import { ProfileCard, fetchProfileData, getProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, getProfileValidateErrors, profileActions, profileReducer } from "entities/Profile";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModule/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { TextTheme, Text } from "shared/ui/Text/Text";
import { ValidateProfileErrors } from "entities/Profile/model/types/profile";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useParams } from "react-router-dom";
import { Page } from "shared/ui/Page/Page";

const reducers: ReducersList = {
    profile: profileReducer
}

const ProfilePage = () => {
    const {t} = useTranslation('profile'); 
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();
    const validateErrors = useSelector(getProfileValidateErrors);
    const {id} = useParams<{id: string}>();

    const validateErrorTranslates = {
        [ValidateProfileErrors.SERVER_ERROR]: t('Серверная ошибка'),
        [ValidateProfileErrors.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
        [ValidateProfileErrors.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidateProfileErrors.INCORRECT_COUNTRY]: t('Некорректный регион'),
        [ValidateProfileErrors.NO_DATA]: t('Нет данных'),

    }

    useInitialEffect(() => {
        if(id){
           dispatch(fetchProfileData(id)); 
        }
    })

    const onChangeFirstname = useCallback((value?: string) => {
         dispatch(profileActions.updateProfile({first: value || ''})); 
    }, [dispatch]);

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''})); 
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({age: Number(value) || 0})); 
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({city: value || ''}));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({username: value || ''}));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({avatar: value || ''}));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({currency}));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({country}));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page>
                <ProfilePageHeader/>
                {validateErrors?.length && validateErrors.map(err =>  (
                    <Text
                        key={err}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslates[err]}
                    />
                ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry} 
                />
            </Page>
        </DynamicModuleLoader>
)}

export default ProfilePage;