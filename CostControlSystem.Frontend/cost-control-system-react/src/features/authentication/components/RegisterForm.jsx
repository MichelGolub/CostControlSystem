import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from 'store'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export { RegisterForm }

function RegisterForm() {
    const dispatch = useDispatch()
    const authError = useSelector(x => x.auth.error)

    useEffect(() => {
        dispatch(authActions.clearError())
    }, [])

    const validationSchema = yup.object().shape({
        email: yup.string().email()
            .required('email is required'),
        password: yup.string()
            .min(5, 'password length must be not less than ${min} symbols')
            .required('password is required'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        username: yup.string()
            .required('username is required')
    })
    const formOptions = { resolver: yupResolver(validationSchema) }

    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors, isSubmitting } = formState

    function onSubmit({ email, password, username }) {
        return dispatch(authActions.register({ email, password, username }))
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
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        {...register('username')}
                        className={`${errors.username ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder="Enter username"
                    />
                    <Form.Control.Feedback>Great</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        {...register('password')}
                        className={`${errors.password ? 'is-invalid' : ''}`}
                        type="password"
                        placeholder="Password"
                    />
                    <Form.Control.Feedback>70p 53cr37</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        {...register('confirmPassword')}
                        className={`${errors.confirmPassword ? 'is-invalid' : ''}`}
                        type="password"
                        placeholder="Confirm password"
                    />
                    <Form.Control.Feedback>Nice</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
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
                    {authError.message}
                </Alert>
            }
        </Form>
    )
}