import { Card } from "@/shared/ui/redesigned/Card/Card";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { useTranslation } from "react-i18next";
import { useGetUsersList } from "../../Api/usersListApi";
import { UserItem } from "../UserItem/UserItem";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { useCallback, useState } from "react";

export const UsersList = () => {
    const { t } = useTranslation();

    const [ limit, setLimit] = useState(5);

    const { data } = useGetUsersList(limit);

    const incrementUser = useCallback(() => {
        setLimit(limit + 5);
    }, [limit, setLimit]);

    return (
        <Card max padding='16'>
            <Text title={t('Список пользователей')}/>
            <Card height="middle" padding='24' max>
                <VStack gap='16'>
                    {data?.map((user: any) => (
                        <UserItem key={user.id} user={user}/>
                    ))}
                    <Button onClick={incrementUser}>{t('Еще 5')}</Button>                 
                </VStack>
            </Card>
        </Card>
    )
}
