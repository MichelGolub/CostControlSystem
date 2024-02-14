import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import ButtonWithSpinner from 'components/ButtonWithSpinner'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export default function LoginForm({ onSubmit, error }) {
    const validationSchema = createValidationSchema()
    const formOptions = { resolver: yupResolver(validationSchema) }

    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors, isSubmitting } = formState

    return (
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className='mb-3'>
                <Form.Label>{'Email address'}</Form.Label>
                <Form.Control
                    {...register('email')}
                    type='email'
                    placeholder='Enter email'
                    isInvalid={errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.email?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>{'Password'}</Form.Label>
                <Form.Control
                    {...register('password')}
                    type='password'
                    placeholder='Password'
                    isInvalid={errors.password}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.password?.message}
                </Form.Control.Feedback>
            </Form.Group>

            {
                !!error &&
                <Alert variant='danger'>
                    {error.message || 'Incorrect login or password'}
                </Alert>
            }

            <ButtonWithSpinner
                isLoading={isSubmitting}
                Icon={ArrowUpwardIcon}
                text='Login'
                className='float-end'
                type='submit'
            />
        </Form>
    )
}

function createValidationSchema() {
    return object({
        email: string().email().required('email is required'),
        password: string().required('password is required')
    })
}