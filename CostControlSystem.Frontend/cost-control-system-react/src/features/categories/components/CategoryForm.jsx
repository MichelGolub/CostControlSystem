import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
// eslint-disable-next-line no-unused-vars
import { object, shape, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Form from 'react-bootstrap/Form'
import { ButtonWithSpinner } from 'components'

export { CategoryForm }

function CategoryForm({ category, onSubmit, onSubmitted = () => {} }) {

    const validationSchema = object().shape({
        name: string().required()
    })
    const formOptions = { resolver: yupResolver(validationSchema) }
    const { register, handleSubmit, formState, reset } = useForm(formOptions)
    const { errors, isSubmitting, isSubmitSuccessful } = formState

    useEffect(() => {
        reset(category)
    }, [category])

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

            <Form.Control
                {...register('budgetAccountId')}
                type='text'
                hidden
            />

            <Form.Group className='mb-3'>
                <Form.Label>{'Category name'}</Form.Label>
                <Form.Control
                    {...register('name')}
                />
                <div className='text-danger mt-1'>
                    {errors.name?.message}
                </div>
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