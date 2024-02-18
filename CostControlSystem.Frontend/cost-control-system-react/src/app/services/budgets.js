import { api, providesList } from './api'

const CONTROLLER_NAME = 'budgetaccounts'

export const budgetAccountsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getBudgetAccounts: build.query({
            query: () => ({ url: CONTROLLER_NAME }),
            providesTags: (result) => providesList(result, 'Budgets')
        }),
        addBudgetAccount: build.mutation({
            query: (body) => ({
                url: CONTROLLER_NAME,
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Budgets', id: 'LIST' }]
        }),
        updateBudgetAccount: build.mutation({
            query: (body) => {
                const { id } = body
                return {
                    url: `${CONTROLLER_NAME}/${id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: (_result, _error, arg) => [{ type: 'Budgets', id: arg.id }]
        }),
        deleteBudgetAccount: build.mutation({
            query: (id) => ({
                url: `${CONTROLLER_NAME}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Budgets', id: arg.id }]
        })
    })
})

export const {
    useGetBudgetAccountsQuery,
    useAddBudgetAccountMutation,
    useUpdateBudgetAccountMutation,
    useDeleteBudgetAccountMutation
} = budgetAccountsApi
