import {
    useNavigate,
    useLocation
} from 'react-router-dom'
import { history } from 'helpers/history'
import TheRouter from 'components/TheRouter'

export default function App() {
    history.navigate = useNavigate()
    history.location = useLocation()
    
    return (
        <TheRouter />
    )
}
