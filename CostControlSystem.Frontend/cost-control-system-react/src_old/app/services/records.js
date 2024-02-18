import { api } from './api'

const CONTROLLER_NAME = 'records'

export const recordsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRecords: build.query({
            query: () => ({ url: CONTROLLER_NAME })
        }),
        addRecord: build.mutation({
            query: (body) => ({
                url: CONTROLLER_NAME,
                method: 'POST',
                body
            })
        }),
        updateRecord: build.mutation({
            query: (data) => {
                const { id, ...body } = data
                return {
                    url: `${CONTROLLER_NAME}/${id}`,
                    method: 'PUT',
                    body
                }
            }
        }),
        deleteRecord: build.mutation({
            query: (id) => ({
                url: `${CONTROLLER_NAME}/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useGetRecordsQuery,
    useAddRecordMutation,
    useUpdateRecordMutation,
    useDeleteRecordMutation
} = recordsApi
