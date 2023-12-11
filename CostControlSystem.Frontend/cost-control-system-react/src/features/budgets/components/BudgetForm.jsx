import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// eslint-disable-next-line no-unused-vars
import { object, shape, string, max, required } from 'yup'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ButtonWithSpinner } from 'components'

export { BudgetForm }

function BudgetForm({ budget, onSubmit, onSubmitted = () => {} }) {
    const validationSchema = object().shape({
        name: string()
            .max(250, 'name length must be not greater than ${max} symbols')
            .required('name is required')
    })
    const formOptions = { resolver: yupResolver(validationSchema) }
    const { register, handleSubmit, formState, reset } = useForm(formOptions)
    const { errors, isSubmitting, isSubmitSuccessful } = formState

    useEffect(() => {
        reset(budget)
    }, [budget])

    useEffect(() => {
        if(isSubmitSuccessful) {
            onSubmitted()
        }
    }, [isSubmitSuccessful])

    return (
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Control
                {...register('id')}
                type='text'
                hidden
            />

            <Form.Group>
                <Form.Label>{'Budget account name'}</Form.Label>
                <Form.Control                         
                    {...register('name')}
                    type='text'
                    className='mb-2'
                />
                <div className='text-danger'>
                    {errors.name?.message}
                </div>
            </Form.Group>

            <ButtonWithSpinner
                isLoading={isSubmitting}
                type='submit'
                variant='primary'
                text='Confirm'
            />

            <Button 
                variant='secondary'
                type='button'
                className='float-end'
                onClick={() => reset(budget)}
            >
                {'Cancel'}
            </Button>
            
        </Form>
    )
}
