import { Card } from "@/shared/ui/redesigned/Card/Card"
import { VStack } from "@/shared/ui/redesigned/Stack";
import { useTranslation } from "react-i18next";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { ActivityBar } from "@/features/ActivityBar";

export const AdminPanelContainer = () => {
    const { t } = useTranslation();
    return (
        <VStack gap='16'>
            <Card max padding="24">
                <Text size="l" title={t('Админ панель')}/>
            </Card>
            <ActivityBar/>                
        </VStack>

    )
}
