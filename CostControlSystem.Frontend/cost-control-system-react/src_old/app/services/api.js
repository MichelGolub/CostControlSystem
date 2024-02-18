import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, tokenReceived } from 'app/slices/auth.slice'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL || '/'
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery(
                    '/refresh-token',
                    api,
                    extraOptions
                )
                if (refreshResult.data) {
                    api.dispatch(tokenReceived(refreshResult.data))
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(logout())
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
})