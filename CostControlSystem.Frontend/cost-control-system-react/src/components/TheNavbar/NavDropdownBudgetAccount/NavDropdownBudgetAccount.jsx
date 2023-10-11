import NavDropdown from 'react-bootstrap/NavDropdown'

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { NavDropdownItemCreateBudgetAccount } from './NavDropdownItemCreateBudgetAccount'

export { NavDropdownBudgetAccount }

function NavDropdownBudgetAccount() {

    function onChange() {
        console.log('on Change')
    }

    function onEdit() {
        console.log('on Edit')
    }

    function onDelete() {
        console.log('on Delete')
    }

    return (
        <>
        <NavDropdown title={'My budget account'} >
            <NavDropdown.Item 
                onClick={onChange}
            >
                <ChangeCircleIcon />
                &nbsp;
                {'Change'}
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item
                onClick={onEdit}
                className='text-success'
            >
                <EditIcon />
                &nbsp;
                {'Edit'}
            </NavDropdown.Item>

            <NavDropdown.Item 
                onClick={onDelete}
                className='text-danger'
            >
                <DeleteIcon />
                &nbsp;
                {'Delete'}
            </NavDropdown.Item>

            <NavDropdownItemCreateBudgetAccount />
        </NavDropdown>
        </>
    )
}