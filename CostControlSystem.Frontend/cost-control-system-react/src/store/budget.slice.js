import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosInstance } from 'helpers'


const name = 'budgets'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const reducers = createReducers()
const slice = createSlice({ name, initialState, reducers, extraReducers })

export const budgetsActions = { ...slice.actions, ...extraActions }
export const budgetsReducer = slice.reducer

function createInitialState() {
    return {
        currentBudget: JSON.parse(localStorage.getItem('currentBudget')),
        budgets: [],
        isLoading: false,
        error: null
    }
}

function createReducers() {
    return {
        add,
        update,
        remove,
        setCurrentBudget,
        clearState: () => initialState
    }

    function add(state, action) {
        state.budgets.push(action.payload)
    }

    function update(state, action) {
        const updatedBudget = action.payload
        const idx = state.budgets
            .findIndex(budget => budget.id === updatedBudget.id)
        state.budgets[idx] = updatedBudget
        if (state.currentBudget.id === updatedBudget.id) {
            setCurrentBudget(state, action)
        }
    }

    function remove(state, action) {
        const id = action.payload
        state.budgets = state.budgets
            .filter(budget => budget.id !== id)
        if (state.currentBudget.id === id) {
            action.payload = null
            setCurrentBudget(state, action)
        }
    }

    function setCurrentBudget(state, action) {
        state.currentBudget = action.payload
        localStorage.setItem('currentBudget', JSON.stringify(action.payload))
    }
}

function createExtraActions() {
    const baseUrl = '/budgetaccounts'

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
    return {
        ...getAll(),
        ...create(),
        ...update(),
        ...deleteById()
    }

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll
        return {
            [pending]: (state) => {
                state.isLoading = true
            },
            [fulfilled]: (state, action) => {
                state.budgets = action.payload
                state.isLoading = false
                return state
            },
            [rejected]: (state, action) => {
                state.isLoading = false,
                state.error = action.error
            }
        }
    }

    function create() {
        var { pending, fulfilled, rejected } = extraActions.create
        return {
            [pending]: (state) => {
                state.isLoading = true
            },
            [fulfilled]: (state, action) => {
                state.isLoading = false
                reducers.add(state, action)
                return state
            },
            [rejected]: (state, action) => {
                state.isLoading = false
                state.error = action.error
            }
        }
    }

    function update() {
        var { pending, fulfilled, rejected } = extraActions.update
        return {
            [pending]: (state) => {
                state.error = null
                state.isLoading = true
            },
            [fulfilled]: (state, action) => {
                state.isLoading = false
                reducers.update(state, action)
                return state
            },
            [rejected]: (state, action) => {
                state.isLoading = true
                state.error = action.error
            }
        }
    }

    function deleteById() {
        var { pending, fulfilled, rejected } = extraActions.deleteById
        return {
            [pending]: (state) => {
                state.error = null
                state.isLoading = true
            },
            [fulfilled]: (state, action) => {
                state.isLoading = false
                reducers.remove(state, action)
            },
            [rejected]: (state, action) => {
                state.isLoading = false
                state.error = action.error
            }
        }
    }
}