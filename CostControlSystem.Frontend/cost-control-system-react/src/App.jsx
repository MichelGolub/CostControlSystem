import {
    useNavigate,
    useLocation
} from 'react-router-dom'
import { history } from 'helpers'
import { TheRouter } from 'components'

export { App }

function App() {
    history.navigate = useNavigate()
    history.location = useLocation()
    
    return (
        <TheRouter />
    )
}
