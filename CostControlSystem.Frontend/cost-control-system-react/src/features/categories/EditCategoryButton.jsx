import { useState } from 'react'
import { useUpdateCategoryMutation } from 'app/services/categories'

import { toast } from 'react-toastify'
import CategoryForm from './CategoryForm'
import Modal from 'react-bootstrap/Modal'
import EditIcon from '@mui/icons-material/Edit'
import Button from 'react-bootstrap/Button'

export default function EditCategoryButton({
    category,
    ...props
}) {
    const [showModal, setShowModal] = useState(false)

    const [updateCategory, { error }] = useUpdateCategoryMutation()
    //todo: вынести эту функцию в хук со всех форм 
    async function onSubmit(values) {
        try {
            await updateCategory(values)
                .unwrap()
            toast.success('Category updated')
            setShowModal(false)
        } catch {
            console.error('update category: submitting error')
        }
    }

    return (
        <>
        <Button
            onClick={() => setShowModal(true)}
            variant='success'
            {...props}
        >
            <EditIcon />
            &nbsp;
            {'Edit'}
        </Button>
        
        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Edit category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm
                    category={category}
                    onSubmit={onSubmit}
                    error={error}
                    buttonText='Edit'
                />
            </Modal.Body>
        </Modal>
        </>
    )
}