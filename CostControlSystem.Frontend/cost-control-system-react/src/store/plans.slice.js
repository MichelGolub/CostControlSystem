import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosInstance } from 'helpers'
import moment from 'moment'


const name = 'plans'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const reducers = createReducers()
const slice = createSlice({ name, initialState, reducers, extraReducers })

export const plansActions = { ...slice.actions, ...extraActions }
export const plansReducer = slice.reducer

function createInitialState() {
    return {
        plan: {},
        plans : [],
        isLoading: false,
        error: null
    }
}

function createReducers() {
    return {
        add,
        update,
        remove,
        clearState: () => initialState
    }

    function add(state, action) {
        state.plans.push(action.payload)
    }

    function update(state, action) {
        const updatedPlan = action.payload
        const idx = state.plans
            .findIndex(plan => plan.id === updatedPlan.id)
        state.plans[idx] = updatedPlan
    }

    function remove(state, action) {
        const id = action.payload
        state.plans = state.plans
            .filter(plan => plan.id !== id)
    }
}

function createExtraActions() {
    const baseUrl = '/plans'

    return {
        get: get(),
        getAll: getAll(),
        create: create(),
        update: update(),
        deleteById: deleteById()
    }
    
    function get() {
        return createAsyncThunk(
            `${name}/get`,
            async (id) => {
                return await AxiosInstance
                    .get(`${baseUrl}/${id}`)
            }
        )
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
        ...get(),
        ...getAll(),
        ...create(),
        ...update(),
        ...deleteById()
    }

    function get() {
        var { pending, fulfilled, rejected } = extraActions.get
        return {
            [pending]: (state) => {
                state.error = null
                state.isLoading = true
            },
            [fulfilled]: (state, action) => {
                const plan = action.payload
                plan.startTime = moment(plan.startTime).format('yyyy-MM-DD')
                plan.endTime = moment(plan.endTime).format('yyyy-MM-DD')
                state.isLoading = false
                state.plan = plan
                return state
            },
            [rejected]: (state, action) => {
                state.isLoading = false,
                state.error = action.error
            }
        }
    }

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll
        return {
            [pending]: (state) => {
                state.error = null
                state.isLoading = true
            },
            [fulfilled]: (state, action) => {
                const plans = action.payload.plans
                plans.forEach(plan => {
                    plan.startTime = moment(plan.startTime).format('yyyy-MM-DD')
                    plan.endTime = moment(plan.endTime).format('yyyy-MM-DD')
                })
                state.plans = plans
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
                state.error = null
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