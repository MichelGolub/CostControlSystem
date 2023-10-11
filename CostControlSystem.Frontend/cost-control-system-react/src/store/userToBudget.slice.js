import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {  AxiosInstance } from 'helpers'

// create slice

const name = 'userToBudgets'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const reducers = createReducers()
const slice = createSlice(
    { 
        name, 
        initialState,
        reducers, 
        extraReducers
     }
)

// exports

export const userToBudgetActions = { ...slice.actions, ...extraActions }
export const userToBudgetReducer = slice.reducer

// implementation

function createInitialState() {
    return {
        budgetAccountId : {}
    }
}

function createReducers(){}

function createExtraActions() {
    const baseUrl = '/UserToBudget'

    return {
        getBudgetAccountId: getBudgetAccountId()
    }

    function getBudgetAccountId() {
        return createAsyncThunk(
            `${name}/getBudgetAccountId`,
            async (userId) => await AxiosInstance.get(`${baseUrl}/Get/${userId}`)
        )
    }
}

function createExtraReducers() 
{
    return {
        ...getBudgetAccountId()
    }

    function getBudgetAccountId() {
        let { pending, fulfilled, rejected } = extraActions.getBudgetAccountId
        return {
            [pending]: (state) => {
                state.budgetAccountId = { loading: true }
            },
            [fulfilled]: (state, action) => {
                state.budgetAccountId = action.payload.budgetAccountId
                return state
            },
            [rejected]: (state, action) => {
                state.budgetAccountId = { error: action.error }
            }
        }
    }
}