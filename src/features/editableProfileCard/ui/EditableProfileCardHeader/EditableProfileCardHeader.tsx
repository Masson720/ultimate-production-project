import { getUserAuthData } from "@/entities/User";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button as ButtonDeprecated, ThemeButton } from "@/shared/ui/deprecated/Button/Button";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { HStack } from "@/shared/ui/redesigned/Stack";
import { ToggleFeatures } from "@/shared/features";
import { Card } from "@/shared/ui/redesigned/Card/Card";

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
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <HStack max justify="between">
                    <TextDeprecated 
                        title={t('Профиль')}
                    />
                    {canEdit && (
                        <div>
                            {readonly ? (<ButtonDeprecated 
                                    theme={ThemeButton.OUTLINE}
                                    onClick={onEdit}
                                    data-testid={'EditableProfileCardHeader.EditButton'}
                            >
                                {t('Редактировать')}
                                </ButtonDeprecated>
                            )
                            :
                            (<HStack>
                                <ButtonDeprecated 
                                    theme={ThemeButton.OUTLINE_RED}
                                    onClick={onCancelEdit}
                                    data-testid={'EditableProfileCardHeader.CancelButton'}       
                                >{t('Отменить')}</ButtonDeprecated>
                                <ButtonDeprecated 
                                    theme={ThemeButton.OUTLINE}
                                    onClick={onSave}
                                    data-testid={'EditableProfileCardHeader.SaveButton'}                
                                >
                                    {t('Сохранить')}
                                </ButtonDeprecated>
                                </HStack>)
                            }
                        </div>
                    )}
                </HStack>
            }
            on={
                <Card borderRadius='partial' padding='24' max>
                    <HStack max justify="between">
                        <Text 
                            title={t('Профиль')}
                        />
                        {canEdit && (
                            <div>
                                {readonly ? (<Button 
                                        onClick={onEdit}
                                        data-testid={'EditableProfileCardHeader.EditButton'}
                                >
                                    {t('Редактировать')}
                                    </Button>
                                )
                                :
                                (<HStack gap='8'>
                                    <Button 
                                        onClick={onCancelEdit}
                                        variant="outline"
                                        color="success"
                                        data-testid={'EditableProfileCardHeader.CancelButton'}       
                                    >{t('Отменить')}</Button>
                                    <Button 
                                        onClick={onSave}
                                        variant="outline"
                                        color='error'
                                        data-testid={'EditableProfileCardHeader.SaveButton'}                
                                    >
                                        {t('Сохранить')}
                                    </Button>
                                    </HStack>)
                                }
                            </div>
                        )}
                    </HStack>                    
                </Card>
            }
        />
    )
}