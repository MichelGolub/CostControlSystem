import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, tokenReceived } from 'app/slices/auth.slice'
import { Mutex } from 'async-mutex'
import moment from 'moment'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL || '/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()

    const acquireAndRelease = async (callback) => {
        const release = await mutex.acquire()
        try {
            await callback()
        } finally {
            release()
        }
    }

    const isRefreshTokenExpired = (state) => {
        if (!state.auth.user) {
            return false
        }
        const refreshTokenExpirationMoment = moment(state.auth.user.refreshTokenExpiration)
        return moment().isAfter(refreshTokenExpirationMoment)
    }

    const refreshTokenOrLogout = async () => {
        if (!isRefreshTokenExpired(api.getState())) {
            const refreshResult = await baseQuery({ 
                url: 'auth/refresh-token',
                method: 'POST'
            }, api, extraOptions)
            if (refreshResult.data) {
                api.dispatch(tokenReceived(refreshResult.data))
            }
        } else {
            api.dispatch(logout())
        }
    }

    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            await acquireAndRelease(refreshTokenOrLogout)
            result = await baseQuery(args, api, extraOptions)
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Budgets'],
    endpoints: () => ({})
})

export function providesList(resultsWithIds, tagType) {
    return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(({id}) => ({ type: tagType, id }))
    ] : [
        { type: tagType, id: 'LIST' }
    ]
}