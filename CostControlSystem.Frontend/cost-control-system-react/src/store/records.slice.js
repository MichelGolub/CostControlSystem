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
        records : [],
        loading: false, 
        error: null
    }
}

function createReducers()
{
    return { }
}

function createExtraActions() {
    const baseUrl = '/records'

    return {
        getAll: getAll(),
        create: add(),
        update: update(),
        deleteById: deleteRecord()
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/GetAll`,
            async () => await AxiosInstance.get(baseUrl)
        )
    }

    function add() {
        return createAsyncThunk(
            `${name}/Create`,
            async ({ categoryId, sum, createTime },{dispatch}) => { 
                const id = await AxiosInstance
                    .post(baseUrl, { categoryId, sum, createTime })
                dispatch(recordsActions.getAll())
                return id
            }
        )
    }

    function deleteRecord() {
        return createAsyncThunk(
            `${name}/Delete`,
            async ( id) => { 
                await AxiosInstance
                .delete(`${baseUrl}/${id}` )
                return id
            }
        )
    }

    function update() {
        return createAsyncThunk(
            `${name}/Update`,
            async ({ id, categoryId, sum, createTime }, { dispatch }) => {
                await AxiosInstance.put(`${baseUrl}/${id}`, { categoryId, sum, createTime })
                dispatch(recordsActions.getAll())
                return { id, categoryId, sum, createTime }
            }
        )
    }

}

function createExtraReducers() {
    return {
        ...getAll(),
        ...deleteRecord(),
        ...update()
    }

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll
        return {
            [pending]: (state) => {
                state.records = { loading: true }
            },
            [fulfilled]: (state, action) => {
                state.records = action.payload.records
                return state
            },
            [rejected]: (state, action) => {
                state.records = { error: action.error }
            }
        }
    }

    function deleteRecord() {
        var { pending, fulfilled, rejected } = extraActions.deleteById
        return {
            [pending]: () => {
                //state.records = { loading: true }
            },
            [fulfilled]: (state, action) => {
          
                state.records = state.records.filter(record => record.id !== action.payload)
            },
            [rejected]: (state, action) => {
                state.records = { error: action.error }
            }
        }
    }

    function update() {
        var { pending, fulfilled, rejected } = extraActions.update
        return {
            [pending]: (state) => {
                state.records = { loading: true }
            },
            [fulfilled]: (state, action) => {
                const updatedRecord = action.payload
                const index = state.records.findIndex(record => record.id === updatedRecord.id)
                if (index !== -1) {
                    state.records[index] = updatedRecord
                }
                return state
            },
            [rejected]: (state, action) => {
                state.records = { error: action.error }
            },
        }
    }
}