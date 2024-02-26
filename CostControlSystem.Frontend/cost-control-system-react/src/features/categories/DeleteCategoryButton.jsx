import { useState } from 'react'
import { useDeleteCategoryMutation } from 'app/services/categories'
import { toast } from 'react-toastify'

import DeleteIcon from '@mui/icons-material/Delete'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ButtonWithSpinner from 'components/ButtonWithSpinner'

export default function DeleteCategoryButton({
    category,
    ...props
}) {
    const [showModal, setShowModal] = useState(false)

    const [deleteCategory, { isLoading }] = useDeleteCategoryMutation()

    async function onDelete() {
        try {
            await deleteCategory(category.id)
                .unwrap()
            toast.success('Category deleted')
            setShowModal(false)
        } catch {
            console.error('delete category: submitting error')
        }
    }

    return (
        <>
        <Button
            onClick={() => setShowModal(true)}
            variant='danger'
            {...props}
        >
            <DeleteIcon />
            &nbsp;
            {'Delete'}
        </Button>
        
        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Delete category?'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {'Are you sure you want to delete '}
                <b>{category.name}</b>
                {' ?'}
            </Modal.Body>
            <Modal.Footer>
                <ButtonWithSpinner
                    isLoading={isLoading}
                    text='Delete'
                    onClick={onDelete}
                    variant='danger'
                    className='me-auto'
                />
                <Button 
                    variant='secondary'
                    onClick={() => setShowModal(false)}
                >
                    {'Cancel'}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}