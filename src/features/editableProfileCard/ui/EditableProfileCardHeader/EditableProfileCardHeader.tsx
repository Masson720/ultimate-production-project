import { getUserAuthData } from "entities/User";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { Text } from 'shared/ui/Text/Text';
import { HStack } from "shared/ui/Stack";

export const EditableProfileCardHeader = () => {
    const {t} = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false)); 
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit()); 
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData()); 
    }, [dispatch])

    return (
        <HStack max justify="between">
            <Text 
                title={t('Профиль')}
            />
            {canEdit && (
                <div>
                    {readonly ? (<Button 
                            theme={ThemeButton.OUTLINE}
                            onClick={onEdit}
                    >{t('Редактировать')}</Button>)
                    :
                    (<HStack><Button 
                            theme={ThemeButton.OUTLINE_RED}
                            onClick={onCancelEdit}            
                        >{t('Отменить')}</Button>
                        <Button 
                            theme={ThemeButton.OUTLINE}
                            onClick={onSave}                        
                        >{t('Сохранить')}</Button>
                        </HStack>)
                    }
                </div>
            )}
        </HStack>
    )
}