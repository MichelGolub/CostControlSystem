import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { history } from 'helpers/history'

export default function PrivateRoute({ children }) {
    const { user: authUser } = useSelector(x => x.auth)

    if (!authUser) {
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    return children
}