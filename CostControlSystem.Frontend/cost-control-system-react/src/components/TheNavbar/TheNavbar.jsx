import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import { NavDropdownBudgetAccount } from './NavDropdownBudgetAccount'
import { NavItemAuth } from './NavItemAuth'

export { TheNavbar }

function TheNavbar() {
    return (
        <Navbar className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand href="/">{'CCS'}</Navbar.Brand>
                <Nav className='justify-content-end flex-grow-1'>
                    <NavDropdownBudgetAccount />
                    <NavItemAuth />
                </Nav>
            </Container>
        </Navbar>
    )
}