import { Button, ThemeButton } from "shared/ui/Button/Button";
import cls from './ProfilePageHeader.module.scss';
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { useSelector } from "react-redux";
import { getProfileReadonly, profileActions, updateProfileData } from "entities/Profile";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useCallback } from "react";

interface ProfilePageHeaderProps {
    className?: string
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { 
        className 
    } = props;
    
    const {t} = useTranslation('profile');

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
        <div className={cls.ProfilePageHeader}>
            <Text 
                title={t('Профиль')}
            /> 
               {readonly ? (<Button 
                    theme={ThemeButton.OUTLINE}
                    onClick={onEdit}
                    className={cls.editBtn}
            >{t('Редактировать')}</Button>)
            :
            (<><Button 
                    theme={ThemeButton.OUTLINE_RED}
                    onClick={onCancelEdit}
                    className={cls.editBtn}
                >{t('Отменить')}</Button>
                <Button 
                    theme={ThemeButton.OUTLINE}
                    onClick={onSave}
                    className={cls.saveBtn} 
                >{t('Сохранить')}</Button>
                </>)
        }
        </div>
        )
}