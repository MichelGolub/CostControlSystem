import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosInstance } from 'helpers'


const name = 'users'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const reducers = createReducers()
const slice = createSlice({ name, initialState, reducers, extraReducers })

export const usersActions = { ...slice.actions, ...extraActions }
export const usersReducer = slice.reducer

function createInitialState() {
    return {
        users : [],
        isLoading: false,
        error: null
    }
}

function createReducers() {
    return {
        clearState: () => initialState
    }
}

function createExtraActions() {
    const baseUrl = '/users'

    return {
        getAll: getAll()
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async (budgetAccountId) => {
                return await AxiosInstance
                    .get(baseUrl, null, { params: { budgetAccountId } })
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...getAll()
    }

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll
        return {
            [pending]: (state) => {
                state.error = null
                state.isLoading = true
            },
            [fulfilled]: (state, action) => {
                state.users = action.payload
                state.isLoading = false
                return state
            },
            [rejected]: (state, action) => {
                state.isLoading = false,
                state.error = action.error
            }
        }
    }
}