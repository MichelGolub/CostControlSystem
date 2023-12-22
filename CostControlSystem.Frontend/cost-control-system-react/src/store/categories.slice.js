import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosInstance } from 'helpers'

const name = 'categories'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const reducers = createReducers()
const slice = createSlice({ name, initialState, reducers, extraReducers })

export const categoriesActions = { ...slice.actions, ...extraActions }
export const categoriesReducer = slice.reducer

function createInitialState() {
    return {
        category: {},
        categories: [],
        isLoading: false,
        error: null
    }
}

function createReducers() {
    return {
        add,
        edit,
        removeById
    }

    function add(state, action) {
        state.categories.push(action.payload)
    }

    function edit(state, action) {
        const editedCategory = action.payload
        const idx = state.categories
            .findIndex(category => category.id === editedCategory.id)
        state.categories[idx] = editedCategory
    }

    function removeById(state, action) {
        const id = action.payload
        state.categories = state.categories
            .filter(category => category.id !== id)
    }
}

function createExtraActions() {
    const baseUrl = '/categories'

    return {
        getById: getById(),
        getAll: getAll(),
        create: create(),
        update: update(),
        deleteById: deleteById()
    } 

    function getById() {
        return createAsyncThunk(
            `${name}/getById`,
            async (id, { rejectWithValue }) => { 
                try {
                    return await AxiosInstance
                        .get(`${baseUrl}/${id}`)
                } catch {
                    return rejectWithValue
                }
            }
        )
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async (budgetAccountId) => {
                return await AxiosInstance
                    .get(baseUrl, { params: { budgetAccountId } })
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
    return (builder) => {
        getById()
        getAll()
        create()
        update()
        deleteById()

        function getById() {
            const { pending, fulfilled, rejected } = extraActions.getById
            builder
                .addCase(pending, (state) => {
                    state.error = null
                })
                .addCase(fulfilled, (state, action) => {
                    state.category = action.payload
                    return state
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                })
        }

        function getAll() {
            const { pending, fulfilled, rejected } = extraActions.getAll
            builder
                .addCase(pending, (state) => {
                    state.error = null
                    state.isLoading = true
                })
                .addCase(fulfilled, (state, action) => {
                    state.categories = action.payload
                    state.isLoading = false
                    return state
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error
                    state.isLoading = false
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