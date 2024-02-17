import { configureStore } from '@reduxjs/toolkit'

import { api } from './services/api'
import auth from './slices/auth.slice'
import budget from './slices/budget.slice'

export const createStore = (options) => {
    return (
        configureStore({
            reducer: {
                [api.reducerPath]: api.reducer,
                auth,
                budget
            },
            middleware: (getDefaultMiddleware) => 
                getDefaultMiddleware().concat(api.middleware),
            ...options
        })
    )
}
    
export const store = createStore()