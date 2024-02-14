import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, ref, string } from 'yup'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import ButtonWithSpinner from 'components/ButtonWithSpinner'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export default function RegisterForm({ onSubmit, error }) {
    const validationSchema = createValidationSchema()
    const formOptions = { resolver: yupResolver(validationSchema) }

    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors, isSubmitting } = formState

    return (
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
                    <Form.Label>{'Email address'}</Form.Label>
                    <Form.Control
                        {...register('email')}
                        type="email"
                        placeholder="Enter email"
                        isInvalid={errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                    <Form.Label>{'Username'}</Form.Label>
                    <Form.Control
                        {...register('username')}
                        type="text"
                        placeholder="Enter username"
                        isInvalid={errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username?.message}
                    </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                    <Form.Label>{'Password'}</Form.Label>
                    <Form.Control
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        isInvalid={errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                    </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                    <Form.Label>{'Confirm password'}</Form.Label>
                    <Form.Control
                        {...register('confirmPassword')}
                        type="password"
                        placeholder="Confirm password"
                        isInvalid={errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
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
                text='Sing up'
                className='float-end'
                type='submit'
            />

        </Form>
    )
}

function createValidationSchema(){
    return object({
        email: string().email()
            .required('email is required'),
        password: string()
            .min(5, 'password length must be not less than ${min} symbols')
            .required('password is required'),
        confirmPassword: string()
            .oneOf([ref('password'), null], 'passwords must match'),
        username: string()
            .required('username is required')
    })
}
