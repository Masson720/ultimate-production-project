import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency'; 
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { ProfileCard } from '@/entities/Profile';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModule/DynamicModuleLoader';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { ValidateProfileErrors } from '../../model/consts/consts';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface EditableProfileCardProps {
    className?: string;
    id?: string
}

const reducers: ReducersList = {
    profile: profileReducer
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();
    const validateErrors = useSelector(getProfileValidateErrors);

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
    }, [])

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
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap='8' max className={classNames('', {}, [className])}>
            <EditableProfileCardHeader/>
            {validateErrors?.length && validateErrors.map(err =>  (
                            <Text
                                key={err}
                                theme={TextTheme.ERROR}
                                text={validateErrorTranslates[err]}
                                data-testid='EditableProfileCard.Error'
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
            </VStack >
        </DynamicModuleLoader>
    );
});