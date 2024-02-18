import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from 'store'

export { NavItemAuth }

function NavItemAuth() {
    const authUser = useSelector(x => x.auth.user)

    const dispatch = useDispatch()
    const logout = () => dispatch(authActions.logout())

    return (
        <>
        <Navbar.Text className='ms-3'>
            {'Signed in as:'}
            &nbsp;
        </Navbar.Text>
        <NavDropdown title={authUser.userName} align={'end'}>
            <NavDropdown.Item disabled>
                <SettingsIcon />
                &nbsp;
                {'Edit'}
            </NavDropdown.Item>
            <NavDropdown.Item 
                onClick={logout}
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