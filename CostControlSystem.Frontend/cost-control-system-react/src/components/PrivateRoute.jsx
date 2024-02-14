import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from 'app/slices/auth.slice'

import { Navigate } from 'react-router-dom'
import { history } from 'helpers/history'

export default function PrivateRoute({ children }) {
    const isAuthenticated = useSelector(selectIsAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    return children
}