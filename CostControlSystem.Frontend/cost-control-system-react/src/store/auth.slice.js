import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { history, AxiosInstance } from 'helpers'

const name = 'auth'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const slice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers
})

export const authActions = { ...slice.actions, ...extraActions }
export const authReducer = slice.reducer

function createInitialState() {
    return {
        //todo заменить localstorage на cookies
        user: JSON.parse(localStorage.getItem('user')),
        error: null
    }
}

function createReducers() {
    return {
        logout,
        clearError
    }

    function logout(state) {
        state.user = null
        localStorage.removeItem('user')
        history.navigate('/login')
    }

    function clearError(state) {
        state.error = null
    }
}

function createExtraActions() {
    const baseURL = 'auth'

    return {
        login: login(),
        register: register(),
        refreshToken: refreshToken()
    }

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ email, password }) => await AxiosInstance
                .post(`${baseURL}/token`, { email, password })
        )
    }

    function register() {
        return createAsyncThunk(
            `${name}/register`,
            async ({ email, password, username }, { rejectWithValue }) => {
                try{
                    return await AxiosInstance
                        .post(`${baseURL}/register`, { email, password, username })
                } catch(err) {
                    return rejectWithValue(err)
                }
            }
        )
    }

    function refreshToken() {
        return createAsyncThunk(
            `${name}/refreshToken`,
            async (_, { getState, dispatch }) => {
                const user = getState().auth.user
                const refreshTokenExpiration = user.refreshTokenExpiration
                const expirationDate = Date.parse(refreshTokenExpiration)
                const now = new Date()
                if (now <= expirationDate) {
                    const token = user.refreshToken
                    return await AxiosInstance
                        .post(`${baseURL}/refresh-token`, {}, { headers: { 'refreshToken': token } })
                } else {
                    dispatch(authActions.logout())
                }
            }
        )
    }
}

function createExtraReducers() {
    return (builder) => {
        login()
        register()
        refreshToken()

        function login() {
            const { pending, fulfilled, rejected } = extraActions.login
            builder
                .addCase(pending, (state) => {
                    state.error = null
                })
                .addCase(fulfilled, (state, action) => {
                    const user = action.payload
    
                    localStorage.setItem('user', JSON.stringify(user))
                    state.user = user
    
                    const { from } = history.location.state || { from: { pathname: '/' } }
                    history.navigate(from)
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                })
        }
    
        function register() {
            const { pending, fulfilled, rejected } = extraActions.register
            builder
                .addCase(pending, (state) => {
                    state.error = null
                })
                .addCase(fulfilled, () => {
                    history.navigate('/login')
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                })
        }
    
        function refreshToken() {
            const { pending, fulfilled, rejected } = extraActions.refreshToken
            builder
                .addCase(pending, (state) => {
                    state.error = null
                })
                .addCase(fulfilled, (state, action) => {
                    const user = action.payload
                    localStorage.setItem('user', JSON.stringify(user))
                    state.user = user
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                })
        }
    }
}