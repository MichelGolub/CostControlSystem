import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, number, date } from 'yup'
import moment from 'moment'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ButtonWithSpinner from 'components/ButtonWithSpinner'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useGetCategoriesQuery } from 'app/services/categories'

export default function RecordForm({ 
    onSubmit,
    record,
    error,
    buttonText = 'Ok'
}) {
    const validationSchema = createValidationSchema()
    const formOptions = { resolver: yupResolver(validationSchema) }
    
    const { register, handleSubmit, formState, reset } = useForm(formOptions)
    const { errors, isSubmitting } = formState

    useEffect(() => {
        const expandedRecord = createDefaultExpandedRecord(record)
        console.log(expandedRecord)
        reset(expandedRecord)
    }, [record])

    const prepareSubmitting = async (values) => {
        const record = collapseRecord(values)
        return onSubmit(record)
    }

    const { 
        data: categories,
        isFetching 
    } = useGetCategoriesQuery(record.budgetAccountId)

    return (
        <Form 
            onSubmit={handleSubmit(prepareSubmitting)} 
            noValidate
        >
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
                    isInvalid={errors.date}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.date?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>{'Sum'}</Form.Label>
                <Form.Control
                    {...register('sum')}
                    type='number'
                    isInvalid={errors.sum}
                    min='1'
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.sum?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Check
                    {...register('isIncome')}
                    type='switch'
                    label='income'
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>{'Category'}</Form.Label>
                <Form.Select 
                    {...register('categoryId')} 
                    disabled={isFetching || !categories?.length} 
                >
                    {
                        categories?.map((category, index) => 
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

            {
                !!error &&
                <Alert variant='danger'>
                    {
                        error.message || 
                        'Server error. Try again later'
                    }
                </Alert>
            }

            <ButtonWithSpinner
                isLoading={isSubmitting || isFetching}
                Icon={ArrowUpwardIcon}
                text={buttonText}
                type='submit'
            />

            <Button 
                variant='secondary'
                type='button'
                className='float-end'
                onClick={() => reset(createDefaultExpandedRecord(record))}
            >
                {'Cancel'}
            </Button>
        </Form>
    )
}

function createValidationSchema() {
    return object({
        date: date()
            .typeError('start time is required'),
        sum: number()
            .required('sum is required')
    })
}

function createDefaultExpandedRecord(record) {
    record = {
        date: moment().format('yyyy-MM-DD'),
        sum: -100,
        ...record
    }
    return expandRecord(record)
}

function expandRecord(record) {
    const { sum, ...other } = record
    return {
        isIncome: sum > 0,
        sum: Math.abs(sum),
        ...other
    }
}

function collapseRecord(expandedRecord) {
    const { isIncome, sum, ...other } = expandedRecord
    return {
        sum: isIncome ? sum : -sum,
        ...other
    }
}