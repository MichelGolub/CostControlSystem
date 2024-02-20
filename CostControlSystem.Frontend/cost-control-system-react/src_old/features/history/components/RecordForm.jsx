import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
// eslint-disable-next-line no-unused-vars
import { object, shape, date, number } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import moment from 'moment'

import Form from 'react-bootstrap/Form'
import { ButtonWithSpinner } from 'components'

export { RecordForm }

const categories = [
    { id: 0, name: 'food' },
    { id: 1, name: 'clothes' },
    { id: 2, name: 'electronics' }
]

const expandRecord = (record) => {
    const { sum, ...other } = record
    return {
        isIncome: sum > 0,
        sum: Math.abs(sum),
        ...other
    }
}

const collapseRecord = (expandedRecord) => {
    const { isIncome, sum, ...other } = expandedRecord
    return {
        sum: isIncome ? sum : -sum,
        ...other
    }
}

function RecordForm({ record, onSubmit, onSubmitted }) {

    const validationSchema = object().shape({
        date: date().typeError('Start time is required'),
        sum: number().required()
    })
    const formOptions = { resolver: yupResolver(validationSchema) }
    const { register, handleSubmit, formState, reset } = useForm(formOptions)
    const { errors, isSubmitting, isSubmitSuccessful } = formState

    const onHandleSubmit = async (data) => {
        const record = collapseRecord(data)
        return onSubmit(record)
    }

    useEffect(() => {
        record = {
            date: moment().format('yyyy-MM-DD'),
            sum: -100,
            ...record
        }
        record = expandRecord(record)
        reset(record)
    }, [record])

    useEffect(() => {
        if(isSubmitSuccessful) {
            onSubmitted()
        }
    }, [isSubmitSuccessful])

    return (
        <Form onSubmit={handleSubmit(onHandleSubmit)} noValidate>
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
                <Form.Label>{'Date'}</Form.Label>
                <Form.Control
                    {...register('date')}
                    type='date'
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Sum</Form.Label>
                <Form.Control
                    {...register('sum')}
                    type='number'
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Category</Form.Label>
                <Form.Select {...register('categoryId')} disabled={ !categories.length } >
                    {
                        categories.map((category, index) => 
                        <option 
                            key={index}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                        )
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Check
                    {...register('isIncome')}
                    type='switch'
                    label='income'
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