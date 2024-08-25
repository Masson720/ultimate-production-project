import { ListBox } from "@/shared/ui/redesigned/Popups";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { UserRole } from "@/entities/User/model/consts/consts";

const options = [
    {value: UserRole.ADMIN, content: UserRole.ADMIN},
    {value: UserRole.MANAGER, content: UserRole.MANAGER},
    {value: UserRole.USER, content: UserRole.USER}
]

interface RolesListProps {
    className?: string
    value?: UserRole[]
    onChange?: (value: any) => void
}

export const RolesList = memo(({value, onChange}: RolesListProps) => {

    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: UserRole) => {
        onChange?.(value as UserRole);
    }, [onChange]);

    if(!value){
        return null;
    }

    const props = {
        value: value[0],
        items: options,
        defaultValue: t('Роль пользователя'),
        onChange: onChangeHandler,
        direction: "right" as const
    }

    return (
        <ListBox {...props}/>
    )
})