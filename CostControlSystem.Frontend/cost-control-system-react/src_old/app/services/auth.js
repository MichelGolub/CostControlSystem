import { api } from './api'

const CONTROLLER_NAME = 'auth'

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (credentials) => ({
                url: `${CONTROLLER_NAME}/token`,
                method: 'POST',
                body: credentials
            })
        }),
        register: build.mutation({
            query: (body) => ({
                url: `${CONTROLLER_NAME}/register`,
                method: 'POST',
                body
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = authApi

export const {
    endpoints: { login }
} = authApi

/*
function createExtraActions() {
    
    return {
        refreshToken: refreshToken()
    }

    function refreshToken() {
        return createAsyncThunk(
            `${name}/refreshToken`,
            async (_, { getState, dispatch }) => {
                const user = getState().auth.user
                const refreshTokenExpiration = user.refreshTokenExpiration
                const expirationDate = Date.parse(refreshTokenExpiration)
                const now = new Date()
                if (now <= expirationDate) {
                    const token = user.refreshToken
                    return await AxiosInstance
                        .post(`${baseURL}/refresh-token`, {}, { headers: { 'refreshToken': token } })
                } else {
                    dispatch(authActions.logout())
                }
            }
        )
    }
}

function createExtraReducers() {
    return (builder) => {
        refreshToken()

        function refreshToken() {
            const { fulfilled } = extraActions.refreshToken
            builder
                .addCase(fulfilled, (state, action) => {
                    const user = action.payload
                    localStorage.setItem('user', JSON.stringify(user))
                    state.user = user
                })
        }
    }
}
*/