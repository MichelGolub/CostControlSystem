import { api } from './api'

const CONTROLLER_NAME = 'auth'

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (credentials) => ({
                url: `${CONTROLLER_NAME}/token`,
                method: 'POST',
                body: credentials
            }),
            transformErrorResponse: (response) => ({ 
                status: response.status,
                message: response.error
            })
        }),
        register: build.mutation({
            query: (body) => ({
                url: `${CONTROLLER_NAME}/register`,
                method: 'POST',
                body
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = authApi

export const {
    endpoints: { login }
} = authApi
