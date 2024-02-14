import Nav from 'react-bootstrap/Nav'
import BootstrapNavbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'

import NavBudgetAccount from './NavBudgetAccount'
import NavAuth from './NavAuth'

export default function Navbar() {
    return (
        <BootstrapNavbar className='bg-body-tertiary'>
            <Container>
                <BootstrapNavbar.Brand href='/'>
                    {'CSS'}
                </BootstrapNavbar.Brand>

                <Nav>
                    <LinkContainer to='/records'>
                        <Nav.Link>History</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/categories'>
                        <Nav.Link>Categories</Nav.Link>
                    </LinkContainer>
                </Nav>

                <Nav className='justify-content-end flex-grow-1'>
                    <NavBudgetAccount />
                    <NavAuth />
                </Nav>
            </Container>
        </BootstrapNavbar>
    )
}