import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentBudgetId } from 'app/slices/budget.slice'
import { useAddCategoryMutation } from 'app/services/categories'
import { toast } from 'react-toastify'

import ButtonWithSpinner from 'components/ButtonWithSpinner'
import Modal from 'react-bootstrap/Modal'
import AddIcon from '@mui/icons-material/Add'
import CategoryForm from './CategoryForm'

export default function CreateCategoryButton() {
    const [showModal, setShowModal] = useState(false)

    const currentBudgetId = useSelector(selectCurrentBudgetId)
    const [addCategory, { isLoading, error }] = useAddCategoryMutation()

    async function onSubmit(values) {
        try {
            await addCategory(values)
                .unwrap()
            toast.success('Category created')
            setShowModal(false)
        } catch {
            console.error('add category: submitting error')
        }
    }

    return (
        <>
        <ButtonWithSpinner
            isLoading={isLoading}
            Icon={AddIcon}
            text='Create'
            onClick={() => setShowModal(true)}
            className='float-end'
        />

        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            animation={false}
        >
            <Modal.Header>
                <Modal.Title>{'Create new category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm
                    onSubmit={onSubmit}
                    error={error}
                    buttonText='Create'
                    category={{ budgetAccountId: currentBudgetId }}
                />
            </Modal.Body>
        </Modal>
        </>
    )
}