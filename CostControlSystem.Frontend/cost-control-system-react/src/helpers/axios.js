import axios from 'axios'
import { authActions } from 'store'

let store

export const injectStore = _store => {
    store = _store
}

export const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URI,
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
})

AxiosInstance.interceptors.request.use(configRequest)
AxiosInstance.interceptors.response.use(hadleResponse, hadleError)

function configRequest(config) {
    config.headers.authorization = authToken()
    return config
}

function authToken() {
    return store.getState().auth.token
}

function hadleResponse(response) {
    return Promise.resolve(response.data)
}

function hadleError(err) {
    if (!err.response) {
        // network error
        return Promise.reject({ message: 'Connection error', status: 503 })
    }

    const originalRequest = err.config
    const logout = () => store.dispatch(authActions.logout())
    const refreshToken = () => store.dispatch(authActions.refreshToken())

    switch (err.response.status) {
        case 401:
            if(!originalRequest._retry) {
                originalRequest._retry = true
                return refreshToken()
                    .then(() => {
                        originalRequest.headers.Authorization = `Bearer ${authToken()}`
                        return AxiosInstance(originalRequest)
                    })
            }
            logout()
            break
        case 403:
            logout()
            break
        default:
            break
    }
    
    return Promise.reject({ message: err.response.data, status: err.response.status })
}