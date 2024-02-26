import {
    useNavigate,
    useLocation
} from 'react-router-dom'
import { history } from 'helpers/history'
import Router from 'components/Router'
import { ToastContainer } from 'react-toastify'

export default function App() {
    history.navigate = useNavigate()
    history.location = useLocation()
    
    return (
        <>
            <Router />
            <ToastContainer 
                position='bottom-left'
                autoClose={3200}
            />
        </>
    )
}
