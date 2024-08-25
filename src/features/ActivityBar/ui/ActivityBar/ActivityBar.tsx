import { Card } from "@/shared/ui/redesigned/Card/Card";
import { useTranslation } from "react-i18next";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { useActivityLogs } from "../../api/activityApi";
import { useCallback, useState } from "react";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { ActivityItem } from "../ActivityItem/ActivityItem";
import { Button } from "@/shared/ui/redesigned/Button/Button";

export const ActivityBar = () => {
    const { t } = useTranslation();
    const [ limit, setLimit ] = useState(50);
    const { data } = useActivityLogs(limit);

    const incrementLimit = useCallback(() => {
        setLimit(limit + 50)
    }, [])
    
    return (
        <Card padding="16" max>
            <Text title={t('Активность')}/>
            <Card height="middle">
                <VStack justify="center">
                    {data?.map((log) => (
                        <ActivityItem action={log.action} details={log.details} timestamp={log.timestamp}/>
                    ))}
                    <Button onClick={incrementLimit}>{t('Еще 50')}</Button>    
                </VStack>
            </Card>              
        </Card>

    )
}