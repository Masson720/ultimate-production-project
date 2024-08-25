import { DetailsLog, UserActions } from "@/shared/lib/sendLog/types/logs";

export interface ActivityLogData {
    action: UserActions
    details: DetailsLog
    timestamp: string
    id: number
}