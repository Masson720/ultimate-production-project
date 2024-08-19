import { Card } from "@/shared/ui/redesigned/Card/Card";
import { useTranslation } from "react-i18next";
import { Text } from '@/shared/ui/redesigned/Text/Text';

export const ActivityBar = () => {
    const { t } = useTranslation()

    return (
        <Card max padding="16">
            <Text title={t('Активность')}/>
        </Card>  
    )
}