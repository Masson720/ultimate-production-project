import { VStack } from "@/shared/ui/redesigned/Stack";
import { useNotifications } from "../../api/notificationApi"
import { NotificationItem } from "../NotificationItem/NotificationItem";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { toggleFeatures } from "@/shared/features";

interface NotificationListProps {
    className?: string
}

export const NotificationList = (props: NotificationListProps) => {
    const {
        className
    } = props;

    const {data, isLoading} = useNotifications(null, {
        pollingInterval: 5000
    });

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => SkeletonDeprecated,
        on: () => SkeletonRedesigned
    })
 
    if(isLoading){
        return (
            <VStack
                className={classNames('', {}, [className])}
                gap='16'
            >
                <Skeleton width='100%' border="8px" height='80px'/>
                <Skeleton width='100%' border="8px" height='80px'/>
                <Skeleton width='100%' border="8px" height='80px'/>
            </VStack>
        )
    }

    return (
        <VStack
            className={classNames('', {}, [className])}
            gap='16'
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item}/>
            ))}
        </VStack>
    )
}
