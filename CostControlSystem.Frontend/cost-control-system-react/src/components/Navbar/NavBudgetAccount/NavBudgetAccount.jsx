import NavDropdown from 'react-bootstrap/NavDropdown'

import { useSelector } from 'react-redux'
import { selectCurrentBudgetName } from 'app/slices/budget.slice'

import ChangeBudgetAccountDropdownItem from './ChangeBudgetAccountDropdownItem'
import EditBudgetAccountDropdownItem from './EditBudgetAccountDropdownItem'
import DeleteBudgetAccountDropdownItem from './DeleteBudgetAccountDropdownItem'
import CreateBudgetAccountDropdownItem from './CreateBudgetAccountDropdownItem'

export default function NavBudgetAccount() {
    const currentBudgetName = useSelector(selectCurrentBudgetName) 

    return (
        <NavDropdown title={
            <b>{currentBudgetName || 'Select budget account'}</b>
        }>
            <ChangeBudgetAccountDropdownItem />

            <NavDropdown.Divider />

            <EditBudgetAccountDropdownItem />
            <DeleteBudgetAccountDropdownItem />
            <CreateBudgetAccountDropdownItem />
        </NavDropdown>
    )
}