import { api } from './api'

const CONTROLLER_NAME = 'categories'

export const categoriesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategory: build.query({
            query: (id) => ({ url: `${CONTROLLER_NAME}/${id}` })
        }),
        getCategories: build.query({
            query: (budgetAccountId) => ({ 
                url: CONTROLLER_NAME,
                params: { budgetAccountId }
            })
        }),
        addCategory: build.mutation({
            query: (body) => ({
                url: CONTROLLER_NAME,
                method: 'POST',
                body
            })
        }),
        updateCategory: build.mutation({
            query: (data) => {
                const { id, ...body } = data
                return {
                    url: `${CONTROLLER_NAME}/${id}`,
                    method: 'PUT',
                    body
                }
            }
        }),
        deleteCategory: build.mutation({
            query: (id) => ({
                url: `${CONTROLLER_NAME}/${id}`,
                method: 'DELETE'
            })
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
