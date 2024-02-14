import NavDropdown from 'react-bootstrap/NavDropdown'

import ChangeBudgetAccountDropdownItem from './ChangeBudgetAccountDropdownItem'
import EditBudgetAccountDropdownItem from './EditBudgetAccountDropdownItem'
import DeleteBudgetAccountDropdownItem from './DeleteBudgetAccountDropdownItem'
import CreateBudgetAccountDropdownItem from './CreateBudgetAccountDropdownItem'

export default function NavBudgetAccount() {
    return (
        <NavDropdown title={
            <b>{'Select budget account'}</b>
        }>
            <ChangeBudgetAccountDropdownItem />

            <NavDropdown.Divider />

            <EditBudgetAccountDropdownItem />
            <DeleteBudgetAccountDropdownItem />
            <CreateBudgetAccountDropdownItem />
        </NavDropdown>
    )
}