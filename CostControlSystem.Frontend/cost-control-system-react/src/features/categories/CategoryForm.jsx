import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ButtonWithSpinner from 'components/ButtonWithSpinner'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export default function CategoryForm({ 
    onSubmit, 
    category, 
    error, 
    buttonText = 'Ok' 
}) {
    const validationSchema = createValidationSchema()
    const formOptions = { resolver: yupResolver(validationSchema) }
    
    const { register, handleSubmit, formState, reset } = useForm(formOptions)
    const { errors, isSubmitting } = formState

    useEffect(() => {
        reset(category)
    }, [category])

    return (
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Control
                {...register('id')}
                type='text'
                hidden
            />

            <Form.Control
                {...register('budgetAccountId')}
                type='text'
                hidden
            />

            <Form.Group className='mb-3'>
                <Form.Label>{'Category name'}</Form.Label>
                <Form.Control
                    {...register('name')}
                    type='text'
                    placeholder='Enter category name'
                    isValid={errors.name}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            {
                !!error &&
                <Alert variant='danger'>
                    {error.message || 'Server error. Try again later'}
                </Alert>
            }

            <ButtonWithSpinner
                isLoading={isSubmitting}
                Icon={ArrowUpwardIcon}
                text={buttonText}
                type='submit'
            />

            <Button 
                variant='secondary'
                type='button'
                className='float-end'
                onClick={() => reset(category)}
            >
                {'Cancel'}
            </Button>
        </Form>
    )
}

function createValidationSchema() {
    return object({
        name: string()
            .max(250, 'name length must be not greater than ${max} symbols')
            .required('name is required')
    })
}