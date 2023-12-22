import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from './auth.slice'
import { budgetsReducer } from './budgets.slice'
import { categoriesReducer } from './categories.slice'
import { planForCategoryReducer } from './planForCategory.slice'
import { plansReducer } from './plans.slice'
import { recordsReducer } from './records.slice'

export * from './auth.slice'
export * from './budgets.slice'
export * from './categories.slice'
export * from './plans.slice'
export * from './planForCategory.slice'
export * from './records.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        budgets: budgetsReducer,
        categories: categoriesReducer,
        planForCategory: planForCategoryReducer,
        plans: plansReducer,
        records: recordsReducer
    }
})