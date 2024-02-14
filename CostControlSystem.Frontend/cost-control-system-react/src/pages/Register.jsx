import { useRegisterMutation } from 'app/services/auth'

import { NavLink } from 'react-router-dom'
import { history } from 'helpers/history'

import { toast } from 'react-toastify'

import RegisterForm from 'features/authentication/RegisterForm'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function Register() {
    const [register, { error }] = useRegisterMutation()

    async function onSubmit(values) {
        try {
            await register(values)
                .unwrap()
            toast.success('Sing up complete')
            history.navigate('/login')
        } catch {
            console.error('register: submitting error')
        }
    }

    return(
        <Col md={{ span: 6, offset: 3 }}>
            <Card>
                <Card.Header as='h4'>Register</Card.Header>
                <Card.Body>
                    <RegisterForm onSubmit={onSubmit} error={error} />
                    <p>
                        {'Have account?'}&nbsp;
                        <NavLink to='/login'>{'Login'}</NavLink>
                        &nbsp;{'now'}
                    </p>
                </Card.Body>
            </Card>
        </Col>
        
    )
}
