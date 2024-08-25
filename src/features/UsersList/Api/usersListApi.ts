import { User, UserRole } from "@/entities/User";
import { rtkApi } from "@/shared/api/rtkApi";

interface BanUserArg {
    id: string
    value: boolean
}

interface ChangeRoleArg {
    id: string
    value: UserRole[]
}

const usersListApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsersList: builder.query<User[], number>({
            query: (limit) => ({
                url: '/users',
                params: {
                    _limit: limit
                }
            }),
            providesTags: ['Data']
        }),
        banUser: builder.mutation<void, BanUserArg>({
            query: ({id, value}) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: {
                    banned: value
                }
            }),
            invalidatesTags: ['Data']
        }),
        changeRole: builder.mutation<void, ChangeRoleArg>({
            query: ({id, value}) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: {
                    roles: value
                }
            }),
            invalidatesTags: ['Data']
        }),
    })
})


export const useGetUsersList = usersListApi.useGetUsersListQuery;
export const useBanUser = usersListApi.useBanUserMutation;
export const useChangeRole = usersListApi.useChangeRoleMutation;