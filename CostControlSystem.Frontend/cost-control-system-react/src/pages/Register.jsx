import { NavLink } from 'react-router-dom'
import { RegisterForm } from 'features/authentication'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function Register() {
    return(
        <Col md={{ span: 6, offset: 3 }}>
            <Card>
                <Card.Header as='h4'>Register</Card.Header>
                <Card.Body>
                    <RegisterForm />
                    <p>
                        {'Have account? '}
                        <NavLink to='/login'>{'Login'}</NavLink>
                        {' now'}
                    </p>
                </Card.Body>
            </Card>
        </Col>
        
    )
}