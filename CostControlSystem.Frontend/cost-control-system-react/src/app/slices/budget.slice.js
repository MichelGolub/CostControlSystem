import { createSlice } from '@reduxjs/toolkit'
import { logout } from './auth.slice'
import { budgetAccountsApi } from 'app/services/budgets'

const CURRENT_BUDGET = 'currentBudget'

const initialState = {
    currentBudget: JSON.parse(localStorage.getItem(CURRENT_BUDGET))
}

const reducers = createReducers()

const slice = createSlice({ 
    name: 'budget',
    initialState,
    reducers,
    extraReducers: (builder) => {
        onLogout()
        onUpdateBudgetAccount()
        onDeleteBudgetAccount()

        function onLogout() {
            builder.addCase(logout, (state) => {
                reducers.clearCurrentBudget(state)
            })
        }

        function onUpdateBudgetAccount() {
            builder
                .addMatcher(budgetAccountsApi.endpoints
                    .updateBudgetAccount.matchFulfilled, (state, action) => {
                        const updatedBudgetAccount = action.payload
                        if (state.currentBudget.id === updatedBudgetAccount.id) {
                            reducers.setCurrentBudget(state, action)
                        }
                })
        }

        function onDeleteBudgetAccount() {
            builder
                .addMatcher(budgetAccountsApi.endpoints
                    .deleteBudgetAccount.matchFulfilled, (state, action) => {
                        const deletedBudgetAccount = action.payload
                        if (state.currentBudget.id === deletedBudgetAccount.id) {
                            reducers.clearCurrentBudget(state)
                        }
                })
        }
    }
})

function createReducers() {
    return {
        clearCurrentBudget,
        setCurrentBudget
    }

    function clearCurrentBudget(state) {
        localStorage.removeItem(CURRENT_BUDGET)
        state.currentBudget = null
    }

    function setCurrentBudget(state, action) {
        const budget = action.payload
        localStorage.setItem(CURRENT_BUDGET, JSON.stringify(budget))
        state.currentBudget = budget
    }
}

export const {
    setCurrentBudget
} = slice.actions

export default slice.reducer

export const selectCurrentBudgetId = (state) => 
    state.budget.currentBudget?.id

export const selectCurrentBudgetName = (state) =>
    state.budget.currentBudget?.name

export const selectCurrentBudget = (state) =>
    state.budget.currentBudget
