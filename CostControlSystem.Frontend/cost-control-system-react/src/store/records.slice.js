import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosInstance } from 'helpers'

const name = 'records'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const reducers = createReducers()
const slice = createSlice({ name, initialState, reducers, extraReducers })

export const recordsActions = { ...slice.actions, ...extraActions }
export const recordsReducer = slice.reducer

function createInitialState() {
    return {
        records: [],
        error: null
    }
}

function createReducers() {
    return {
        add,
        update,
        removeById,
        clearState: () => initialState
    }

    function add(state, action) {
        state.records.push(action.payload)
    }

    function update(state, action) {
        const updatedRecord = action.payload
        const idx = state.records
            .findIndex(record => record.id === updatedRecord.id)
        state.records[idx] = updatedRecord
    }

    function removeById(state, action) {
        const id = action.payload
        state.records = state.records
            .filter(record => record.id !== id)
    }
}

function createExtraActions() {
    const baseUrl = '/records'

    return {
        getAll: getAll(),
        create: create(),
        update: update(),
        deleteById: deleteById()
    } 

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => 
                await AxiosInstance.get(baseUrl)
        )
    }

    function create()
    {
        return createAsyncThunk(
            `${name}/create`,
            async (payload, { rejectWithValue }) => {
                try {
                    const id = await AxiosInstance.post(baseUrl, payload)
                    return { ...payload, id }
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
                    await AxiosInstance
                        .put(`${baseUrl}`, payload)
                    return payload
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
                    await AxiosInstance
                        .delete(`${baseUrl}/${id}`)
                    return id
                } catch {
                    return rejectWithValue
                }
            }
        )
    }
}

function createExtraReducers() {
    return (builder) => {
        getAll()
        create()
        update()
        deleteById()

        function getAll() {
            const { pending, fulfilled, rejected } = extraActions.getAll
            builder
                .addCase(pending, (state) => {
                    state.error = null
                })
                .addCase(fulfilled, (state, action) => {
                    state.records = action.payload
                    return state
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                })
        }

        function create() {
            const { pending, fulfilled, rejected } = extraActions.create
            builder
                .addCase(pending, (state) => {
                    state.error = null
                })
                .addCase(fulfilled, (state, action) => {
                    reducers.add(state, action)
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
                .addCase(fulfilled, (state, action) => {
                    reducers.update(state, action)
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
                .addCase(fulfilled, (state, action) => {
                    reducers.remove(state, action)
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                })
        }
    }
}