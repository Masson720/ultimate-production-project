import { User, UserRole } from "@/entities/User";
import { getRouteProfile } from "@/shared/const/router";
import { AppLink } from "@/shared/ui/redesigned/AppLink/AppLink";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { useTranslation } from "react-i18next";
import { RolesList } from "../RolesList/RolesList";
import { useCallback } from "react";
import { useBanUser, useChangeRole } from "../../Api/usersListApi";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";

interface UserItemProps {
    className?: string
    user: User
}

export const UserItem = (props: UserItemProps) => {
    const {
        user
    } = props;
    const {
        id,
        username,
        avatar,
        roles,
        banned
    } = user;

    const { t } = useTranslation();
    const [ banUser ] = useBanUser();
    const [ changeRole ] = useChangeRole();

    const changeRoleHandler = useCallback((value: UserRole) => {
        changeRole({id, value: [value]})
    }, [changeRole]);

    const blockUser = useCallback(() => {
        banUser({id, value: true})
    }, [banUser]);

    const unblockUser = useCallback(() => {
        banUser({id, value: false})
    }, [banUser]);

    return (
        <Card border="solid" max padding="24">
            <HStack justify="between">
                <HStack gap='16'>
                    <Avatar size={50} src={avatar}/>
                    <AppLink to={getRouteProfile(props.user.id)}>
                        <Text title={props.user.username}/>
                    </AppLink>                    
                </HStack>
                <HStack gap='16' >
                    <RolesList value={roles} onChange={changeRoleHandler}/>
                    {banned 
                        ?
                        <Button onClick={unblockUser} color="success">{t('Разблокировать')}</Button>
                        :
                        <Button onClick={blockUser} color="error">{t('Заблокировать')}</Button>
                    }                      
                </HStack>
            </HStack>
        </Card>
    )
}