import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
// eslint-disable-next-line no-unused-vars
import { object, shape, number } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Form from 'react-bootstrap/Form'
import { ButtonWithSpinner } from 'components'

export { PlanForm }

function PlanForm({ plan, onSubmit, onSubmitted }) {

    const validationSchema = object().shape({
        limit: number().required()
    })
    const formOptions = { resolver: yupResolver(validationSchema) }
    const { register, handleSubmit, formState, reset } = useForm(formOptions)
    const { errors, isSubmitting, isSubmitSuccessful } = formState

    useEffect(() => {
        reset(plan)
    }, [plan])

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

            <Form.Group className='mb-3'>
                <Form.Label>{'Limit'}</Form.Label>
                <Form.Control
                    {...register('limit')}
                    type='number'
                />
            </Form.Group>

            <ButtonWithSpinner
                isLoading={isSubmitting} 
                type='submit'
                variant='primary'
                text='Confirm'
            />
        </Form>
    )
}