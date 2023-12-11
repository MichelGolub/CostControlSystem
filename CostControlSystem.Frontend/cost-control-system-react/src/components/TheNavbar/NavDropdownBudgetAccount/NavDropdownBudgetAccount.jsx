import NavDropdown from 'react-bootstrap/NavDropdown'

import { NavDropdownItemCreateBudgetAccount } from './NavDropdownItemCreateBudgetAccount'
import { NavDropdownItemChangeBudgetAccount } from './NavDropdownItemChangeBudgetAccount'
import { NavDropdownItemDeleteBudgetAccount } from './NavDropdownItemDeleteBudgetAccount'
import { NavDropdownItemEditBudgetAccount } from './NavDropdownItemEditBudgetAccount'
import { useSelector } from 'react-redux'

export { NavDropdownBudgetAccount }

function NavDropdownBudgetAccount() {
    const currentBudget = useSelector(x => x.budgets.currentBudget)

    return (
        <>
        <NavDropdown title={currentBudget ? currentBudget.name : 'Select budget account'} >
            <NavDropdownItemChangeBudgetAccount />

            <NavDropdown.Divider />

            <NavDropdownItemEditBudgetAccount />
            <NavDropdownItemDeleteBudgetAccount />
            <NavDropdownItemCreateBudgetAccount />
        </NavDropdown>
        </>
    )
}