import { api } from './api'

const CONTROLLER_NAME = 'budgetaccounts'

export const budgetAccountsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getBudgetAccounts: build.query({
            query: () => ({ url: CONTROLLER_NAME })
        }),
        addBudgetAccount: build.mutation({
            query: (body) => ({
                url: CONTROLLER_NAME,
                method: 'POST',
                body
            })
        }),
        updateBudgetAccount: build.mutation({
            query: (data) => {
                const { id, ...body } = data
                return {
                    url: `${CONTROLLER_NAME}/${id}`,
                    method: 'PUT',
                    body
                }
            }
        }),
        deleteBudgetAccount: build.mutation({
            query: (id) => ({
                url: `${CONTROLLER_NAME}/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useGetBudgetAccountsQuery,
    useAddBudgetAccountMutation,
    useUpdateBudgetAccountMutation,
    useDeleteBudgetAccountMutation
} = budgetAccountsApi
