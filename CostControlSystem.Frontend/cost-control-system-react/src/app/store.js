import { configureStore } from '@reduxjs/toolkit'

import { api } from './services/api'
import auth from './slices/auth.slice'
import budgetAccount from './slices/budget.slice'

export const createStore = (options) => {
    return (
        configureStore({
            reducer: {
                [api.reducerPath]: api.reducer,
                auth,
                budgetAccount
            },
            middleware: (getDefaultMiddleware) => 
                getDefaultMiddleware().concat(api.middleware),
            ...options
        })
    )
}
    
export const store = createStore()