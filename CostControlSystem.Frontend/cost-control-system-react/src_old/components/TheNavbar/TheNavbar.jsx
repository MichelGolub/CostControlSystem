import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import { NavDropdownBudgetAccount } from './NavDropdownBudgetAccount'
import { NavItemAuth } from './NavItemAuth'

import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

export default function TheNavbar() {
    //
    return (
        <Navbar className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand href="/">{'CCS'}</Navbar.Brand>

                <Nav>
                    <LinkContainer to='/records'>
                        <Nav.Link>History</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/categories'>
                        <Nav.Link>Categories</Nav.Link>
                    </LinkContainer>
                </Nav>

                <Nav className='justify-content-end flex-grow-1'>
                    <NavDropdownBudgetAccount />
                    <NavItemAuth />
                </Nav>
                
            </Container>
        </Navbar>
    )
}