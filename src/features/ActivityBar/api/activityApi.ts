import { rtkApi } from "@/shared/api/rtkApi";
import { ActivityLogData } from "../model/types/activityLogTypes";

const activityApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getArtivity: builder.query<ActivityLogData[], number>({
            query: (limit) => ({
                url: '/activityLog',
                params: {
                    _limit: limit
                }
            })
        })
    })
})


export const useActivityLogs = activityApi.useGetArtivityQuery;