import { NavLink } from 'react-router-dom'
import { LoginForm } from 'features/authentication'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function Login() {
    return(
        <Col md={{ span: 6, offset: 3 }}>
            <Card>
                <Card.Header as='h4'>Login</Card.Header>
                <Card.Body>
                    <LoginForm />
                    <p>
                        {'Don\'t have account? '}
                        <NavLink to='/register'>{'Register'}</NavLink>
                        {' now'}
                    </p>
                </Card.Body>
            </Card>
        </Col>
    )
}