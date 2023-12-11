import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosInstance } from 'helpers'
import { authActions } from './auth.slice'

const CURRENT_BUDGET = 'currentBudget'

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
        currentBudget: JSON.parse(localStorage.getItem(CURRENT_BUDGET)),
        budgets: [],
        error: null
    }
}

function createReducers() {
    return {
        add,
        edit,
        removeById,
        setCurrentBudgetById,
        clearCurrentBudget
    }

    function add(state, action) {
        state.budgets.push(action.payload)
    }

    function edit(state, action) {
        const editedBudget = action.payload
        const idx = state.budgets
            .findIndex(budget => budget.id === editedBudget.id)
        state.budgets[idx] = editedBudget
        if (state.currentBudget?.id === editedBudget.id) {
            localStorage.setItem(CURRENT_BUDGET, JSON.stringify(editedBudget))
            state.currentBudget = editedBudget
        }
    }

    function removeById(state, action) {
        const id = action.payload
        state.budgets = state.budgets
            .filter(budget => budget.id !== id)
        if (state.currentBudget?.id === id) {
            clearCurrentBudget(state)
        }
    }

    function setCurrentBudgetById(state, action) {
        const id = action.payload
        const currentBudget = state.budgets
            .find(b => b.id === id)
        if (!currentBudget) {
            return state
        }
        localStorage.setItem(CURRENT_BUDGET, JSON.stringify(currentBudget))
        state.currentBudget = currentBudget
    }

    function clearCurrentBudget(state) {
        localStorage.removeItem(CURRENT_BUDGET)
        state.currentBudget = null
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
    return (builder) => {
        getAll()
        create()
        update()
        deleteById()

        builder.addCase(authActions.logout, (state) => {
            reducers.clearCurrentBudget(state)
        })

        function getAll() {
            const { pending, fulfilled, rejected } = extraActions.getAll
            builder
                .addCase(pending, (state) => {
                    state.error = null
                })
                .addCase(fulfilled, (state, action) => {
                    state.budgets = action.payload
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
                    reducers.edit(state, action)
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
                    reducers.removeById(state, action)
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                })
        }
    }
}