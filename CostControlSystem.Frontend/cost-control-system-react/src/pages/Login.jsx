import { useLoginMutation } from 'app/services/auth'
import { setCredentials } from 'app/slices/auth.slice'
import { useDispatch } from 'react-redux'

import { NavLink } from 'react-router-dom'
import { history } from 'helpers/history'

import LoginForm from 'features/authentication/LoginForm'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function Login() {
    const [login, { error }] = useLoginMutation()
    const dispatch = useDispatch()

    async function onSubmit(values) {
        try {
            const data = await login(values)
                .unwrap()
            dispatch(setCredentials(data))
            history.navigate('/')
        } catch {
            console.error('login: submiting error')
        }
    }

    return(
        <Col md={{ span: 6, offset: 3 }}>
            <Card>
                <Card.Header as='h4'>Login</Card.Header>
                <Card.Body>
                    <LoginForm onSubmit={onSubmit} error={error} />
                    <p>
                        {'Don\'t have account?'}&nbsp;
                        <NavLink to='/register'>{'Register'}</NavLink>
                        &nbsp;{'now'}
                    </p>
                </Card.Body>
            </Card>
        </Col>
    )
}
