import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'

import { useSelector, useDispatch } from 'react-redux'
import { logout, selectCurrentUser } from 'app/slices/auth.slice'

export default function NavAuth() {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    return (
        <>
        <Navbar.Text className='ms-3'>
            {'Signed in as:'}
            &nbsp;
        </Navbar.Text>
        <NavDropdown align={'end'} title={
            <b>{user.userName}</b>
        }>
            <NavDropdown.Item disabled>
                <SettingsIcon />
                &nbsp;
                {'Edit'}
            </NavDropdown.Item>
            <NavDropdown.Item 
                onClick={() => dispatch(logout())}
                className='text-danger'
            >
                <LogoutIcon />
                &nbsp;
                {'Logout'}
            </NavDropdown.Item>
        </NavDropdown>
        </>   
    )
}
