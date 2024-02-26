import { api, providesList } from './api'

const CONTROLLER_NAME = 'records'

export const recordsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRecords: build.query({
            query: (budgetAccountId) => ({ 
                url: CONTROLLER_NAME,
                params: { budgetAccountId }
            }),
            providesTags: (result) => providesList(result, 'Records')
        }),
        addRecord: build.mutation({
            query: (body) => ({
                url: CONTROLLER_NAME,
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Records', id: 'LIST' }]
        }),
        updateRecord: build.mutation({
            query: (body) => {
                const { id } = body
                return {
                    url: `${CONTROLLER_NAME}/${id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: (_result, _error, arg) => [{ type: 'Records', id: arg.id }]
        }),
        deleteRecord: build.mutation({
            query: (id) => ({
                url: `${CONTROLLER_NAME}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Records', id: arg.id }]
        })
    })
})

export const {
    useGetRecordsQuery,
    useAddRecordMutation,
    useUpdateRecordMutation,
    useDeleteRecordMutation
} = recordsApi
