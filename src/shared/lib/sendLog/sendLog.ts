import { UserActions } from "@/shared/const/logs";
import { getDate, getTime } from "../getDate/getDate";

interface DetailsLog {
    userName?: string
    userId?: string
    articleName?: string
    articleId?: string
}

export const sendLog = async (action: UserActions, details: DetailsLog) => {
    try {
        await fetch('http://localhost:8000/activityLog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action, details, timestamp: `${getDate()} ${getTime()}`}),
        });
    } catch (error) {
        console.error('Failed to send log:', error);
    }
};