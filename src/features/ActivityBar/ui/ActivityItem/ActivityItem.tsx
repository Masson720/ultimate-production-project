import { DetailsLog, UserActions } from "@/shared/lib/sendLog/types/logs";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { useTranslation } from "react-i18next";

interface ActivityItemProps {
    className?: string
    action: UserActions
    details: DetailsLog
    timestamp: string
}

export const ActivityItem = (props: ActivityItemProps) => {
    const {
        className,
        action,
        details, 
        timestamp
    } = props;
    const { t } = useTranslation();

    const logType = {
        [UserActions.CREATE_ARTICLE]: t('создал статью'),
        [UserActions.DELETE_ARTICLE]: t('удалил статью'),
        [UserActions.EDIT_ARTICLE]: t('отредактировал статью'),
        [UserActions.SEND_COMMENT]: t('оставил комментарий'),
        [UserActions.REGISTRATION_USER]: t('зарегистрировался')
    }

    return (
        <Card>
            <Text text={`${details.userName} ${logType[action]} ${timestamp}`} />
        </Card>
    )
}
