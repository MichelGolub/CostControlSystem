import { createSlice } from '@reduxjs/toolkit'
import { history } from 'helpers/history'

const USER = 'user'

const initialState = {
    user: JSON.parse(localStorage.getItem(USER)),
    token: null
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            history.navigate('/login')
            localStorage.removeItem(USER)
            return initialState
        },
        tokenReceived: (state, action) => {
            state.token = action.payload.token
        },
        setCredentials: (state, { payload }) => {
            const { token, ...user } = payload
            state.user = user
            state.token = token
            localStorage.setItem(USER, JSON.stringify(user))

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
    !!state.auth.user

export const selectCurrentUser = (state) =>
    state.auth.user
