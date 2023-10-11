import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from './auth.slice'
import { budgetsReducer } from './budget.slice'
import { recordsReducer } from './records.slice'
import { planForCategoryReducer } from './planForCategory.slice'
import { plansReducer } from './plans.slice'
import { usersReducer } from './users.slice'

export * from './auth.slice'
export * from './plans.slice'
export * from './budget.slice'
export * from './planForCategory.slice'
export * from './users.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        budgets: budgetsReducer,
        records: recordsReducer,
        planForCategory: planForCategoryReducer,
        plans: plansReducer,
        users: usersReducer
    }
})