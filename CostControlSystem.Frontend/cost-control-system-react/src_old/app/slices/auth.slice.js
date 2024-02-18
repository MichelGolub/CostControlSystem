import { createSlice } from '@reduxjs/toolkit'
import { history } from 'helpers/history'

const initialState = {
    user: null,
    token: null
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            history.navigate('/login')
            return initialState
        },
        tokenReceived: (state, action) => {
            state.token = action.payload
        },
        setCredentials: (state, { payload }) => {
            const { token, ...user } = payload
            state.user = user
            state.token = token

            const { from } = history.location.state || { from: { pathname: '/' } }
            history.navigate(from)
        }
    }
})

export const { 
    logout,
    tokenReceived,
    setCredentials
} = slice.actions

export default slice.reducer

export const selectIsAuthenticated = (state) => 
    !!state.auth.token
export const selectCurrentUser = (state) =>
    state.auth.user