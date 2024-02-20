import { api, providesList } from './api'

const CONTROLLER_NAME = 'categories'

export const categoriesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategory: build.query({
            query: (id) => ({ url: `${CONTROLLER_NAME}/${id}` }),
            providesTags: (_result, _error, id) => [{ type: 'Categories', id }]
        }),
        getCategories: build.query({
            query: (budgetAccountId) => ({ 
                url: CONTROLLER_NAME,
                params: { budgetAccountId }
            }),
            providesTags: (result) => providesList(result, 'Categories')
        }),
        addCategory: build.mutation({
            query: (body) => ({
                url: CONTROLLER_NAME,
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
        }),
        updateCategory: build.mutation({
            query: (body) => {
                const { id } = body
                return {
                    url: `${CONTROLLER_NAME}/${id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: (_result, _error, arg) => [{ type: 'Categories', id: arg.id }]
        }),
        deleteCategory: build.mutation({
            query: (id) => ({
                url: `${CONTROLLER_NAME}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Categories', id: arg.id }]
        })
    })
})

export const {
    useGetCategoryQuery,
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoriesApi
