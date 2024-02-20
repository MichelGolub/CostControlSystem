import NavDropdown from 'react-bootstrap/NavDropdown'

import { NavDropdownItemCreateBudgetAccount } from './NavDropdownItemCreateBudgetAccount'
import { NavDropdownItemChangeBudgetAccount } from './NavDropdownItemChangeBudgetAccount'
import { NavDropdownItemDeleteBudgetAccount } from './NavDropdownItemDeleteBudgetAccount'
import { NavDropdownItemEditBudgetAccount } from './NavDropdownItemEditBudgetAccount'

export default function NavDropdownBudgetAccount() {
    return (
        <>
        <NavDropdown title={'Select budget account'} >
            <NavDropdownItemChangeBudgetAccount />

            <NavDropdown.Divider />

            <NavDropdownItemEditBudgetAccount />
            <NavDropdownItemDeleteBudgetAccount />
            <NavDropdownItemCreateBudgetAccount />
        </NavDropdown>
        </>
    )
}