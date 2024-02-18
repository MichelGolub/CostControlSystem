import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentBudget } from 'app/slices/budget.slice'
import { useDeleteBudgetAccountMutation } from 'app/services/budgets'
import { toast } from 'react-toastify'

import NavDropdown from 'react-bootstrap/NavDropdown'
import DeleteIcon from '@mui/icons-material/Delete'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonWithSpinner from 'components/ButtonWithSpinner'

export default function DeleteBudgetAccountDropdownItem() {
    const [showModal, setShowModal] = useState(false)

    const budget = useSelector(selectCurrentBudget)
    const [deleteBudgetAccount, { isLoading }] = useDeleteBudgetAccountMutation()

    async function onDelete() {
        try {
            await deleteBudgetAccount(budget.id)
                .unwrap()
            toast.success('Budget account deleted')
            setShowModal(false)
        } catch {
            console.error('delete budget account: submitting error')
        }
    }

    return (
        <>
        <NavDropdown.Item
            onClick={() => setShowModal(true)}
            className='text-danger'
            disabled={!budget}
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
                <b>{budget?.name}</b>
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