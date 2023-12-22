import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { categoriesActions } from 'store'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { ButtonWithSpinner } from 'components'

export { ButtonDeleteCategory }

function ButtonDeleteCategory({ categoryId, ...props }) {
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const dispatch = useDispatch()

    const onDelete = async () => {
        setIsLoading(true)
        await dispatch(categoriesActions.deleteById(categoryId))
        setIsLoading(false)
        setShowModal(false)
    }

    return (
        <>
        <Button 
            variant='danger'
            onClick={() => setShowModal(true)}
            {...props}
        >
            <DeleteIcon fontSize='small' />
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
                {'Are you sure you want to delete category?'}
            </Modal.Body>
            <Modal.Footer>
                <ButtonWithSpinner
                    isLoading={isLoading}
                    onClick={onDelete}
                    variant='danger'
                    text='Delete'
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