import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { history } from 'helpers/history'

import { useLoginMutation } from 'app/services/auth'
import { setCredentials } from 'app/slices/auth.slice'
import { useDispatch } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export function LoginForm() {

    const validationSchema = createValidationSchema()
    const formOptions = { resolver: yupResolver(validationSchema) }

    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors, isSubmitting } = formState

    const [login, { data, error, isSuccess }] = useLoginMutation()
    const dispatch = useDispatch()

    async function onSubmit(values) {
        await login(values)
        if (isSuccess) {
            dispatch(setCredentials(data))
            history.navigate('/')
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className='mb-3'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        {...register('email')}
                        type='email'
                        placeholder='Enter email'
                        isInvalid={errors.email}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        {...register('password')}
                        type='password'
                        placeholder='Password'
                        isInvalid={errors.password}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>
            
            <Button
                disabled={isSubmitting}
                variant='primary'
                type='submit'
            >
                {isSubmitting && <span className='spinner-border spinner-border-sm mr-1'></span>}
                Submit
            </Button>

            {
                error &&
                <Alert variant="danger" className="mt-2">
                    { error.message }
                </Alert>
            }
        </Form>
    )
}

function createValidationSchema() {
    return yup.object().shape({
        email: yup.string().email().required('email is required'),
        password: yup.string().required('password is required')
    })
}
