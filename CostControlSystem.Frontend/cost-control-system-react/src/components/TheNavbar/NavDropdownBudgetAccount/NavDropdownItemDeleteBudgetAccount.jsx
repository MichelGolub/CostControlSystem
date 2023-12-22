import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { budgetsActions } from 'store/budgets.slice'

import DeleteIcon from '@mui/icons-material/Delete'
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import { ButtonWithSpinner } from 'components'

export { NavDropdownItemDeleteBudgetAccount }

function NavDropdownItemDeleteBudgetAccount() {
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { currentBudget } = useSelector(x => x.budgets)

    const dispatch = useDispatch()

    const onDelete = async (id) => {
        setIsLoading(true)
        await dispatch(budgetsActions.deleteById(id))
        setIsLoading(false)
        setShowModal(false)
    }

    return (
        <>
        <NavDropdown.Item
            onClick={() => setShowModal(true)}
            className='text-danger'
            disabled={!currentBudget}
        >
            <DeleteIcon />
            &nbsp;
            {'Delete'}
        </NavDropdown.Item>
        
        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Delete budget account?'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {'Are you sure you want to delete '}
                <b>{currentBudget ? currentBudget.name : ''}</b>
                {' ?'}
            </Modal.Body>
            <Modal.Footer>
                <ButtonWithSpinner
                    isLoading={isLoading}
                    onClick={() => onDelete(currentBudget?.id)}
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