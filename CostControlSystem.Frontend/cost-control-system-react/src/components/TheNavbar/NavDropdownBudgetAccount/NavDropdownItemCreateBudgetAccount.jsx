import NavDropdown from 'react-bootstrap/NavDropdown'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

export { NavDropdownItemCreateBudgetAccount }

function NavDropdownItemCreateBudgetAccount() {

    const [isActive, setIsActive] = useState(false)

    function onAdd() {
        setIsActive(true)
    }

    return (
        <NavDropdown.Item
            as='button'
            onClick={onAdd}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            className={ isActive ? '' : 'text-primary'}
        >
            <AddIcon />
            &nbsp;
            {'New'}
        </NavDropdown.Item>
    )
}