import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { history } from 'helpers/history'
import { authActions } from 'store'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export { LoginForm }

function LoginForm() {
    const dispatch = useDispatch()
    const authUser = useSelector(x => x.auth.user)
    const authError = useSelector(x => x.auth.error)

    useEffect(() => {
        dispatch(authActions.clearError())
        if (authUser) {
            history.navigate('/')
        }
    }, [])

    const validationSchema = yup.object().shape({
        email: yup.string().email().required('email is required'),
        password: yup.string().required('password is required')
    })
    const formOptions = { resolver: yupResolver(validationSchema) }

    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors, isSubmitting } = formState

    function onSubmit({ email, password }) {
        return dispatch(authActions.login({ email, password }))
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        {...register('email')}
                        className={`${errors.email ? 'is-invalid' : ''}`}
                        type="email"
                        placeholder="Enter email"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        {...register('password')}
                        className={`${errors.password ? 'is-invalid' : ''}`}
                        type="password"
                        placeholder="Password"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>
            
            <Button
                disabled={isSubmitting}
                variant="primary" 
                type="submit"
            >
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Submit
            </Button>

            {
                authError &&
                <Alert variant="danger" className="mt-2">
                    { authError.message }
                </Alert>
            }
        </Form>
    )
}
