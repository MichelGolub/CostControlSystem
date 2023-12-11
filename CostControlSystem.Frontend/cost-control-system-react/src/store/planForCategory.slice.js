import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosInstance } from 'helpers'

const name = 'planForCategory'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const reducers = createReducers()
const slice = createSlice({ name, initialState, reducers, extraReducers })

export const planForCategoryActions = { ...slice.actions, ...extraActions }
export const planForCategoryReducer = slice.reducer

function createInitialState() {
    return {
        planForCategory: {},
        error: null
    }
}

function createReducers() {
    return {
        clearState: () => initialState
    }
}

function createExtraActions() {
    const baseUrl = '/planforcategory'

    return {
        create: create(),
        update: update(),
        deleteById: deleteById()
    }

    function create()
    {
        return createAsyncThunk(
            `${name}/create`,
            async (payload, { rejectWithValue }) => {
                try {
                    return await AxiosInstance.post(baseUrl, payload)
                } catch(err) {
                    return rejectWithValue(err)
                }
            }
        )
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async (payload, { rejectWithValue }) => {
                try {
                    return await AxiosInstance
                        .put(`${baseUrl}`, payload)
                } catch(err) {
                    return rejectWithValue(err)
                }
            }
        )
    }

    function deleteById() {
        return createAsyncThunk(
            `${name}/deleteById`,
            async (id, { rejectWithValue }) => { 
                try {
                    return await AxiosInstance
                        .delete(`${baseUrl}/${id}`)
                } catch {
                    return rejectWithValue
                }
            }
        )
    }
}

function createExtraReducers() {
    return (builder) => {
        create(),
        update(),
        deleteById()

        function create() {
            const { pending, fulfilled, rejected } = extraActions.create
            builder
                .addCase(pending, (state) => {
                    state.error = null
                })
                .addCase(fulfilled, (state) => {
                    return state
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                })
        }
    
        function update() {
            const { pending, fulfilled, rejected } = extraActions.update
            builder
                .addCase(pending, (state) => {
                    state.error = null
                })
                .addCase(fulfilled, (state) => {
                    return state
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                })
        }
    
        function deleteById() {
            const { pending, fulfilled, rejected } = extraActions.deleteById
            builder
                .addCase(pending, (state) => {
                    state.error = null
                })
                .addCase(fulfilled, (state) => {
                    return state
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                })
        }
    }
}