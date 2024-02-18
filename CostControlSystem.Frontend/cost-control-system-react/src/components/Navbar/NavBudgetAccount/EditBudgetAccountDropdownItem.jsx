import { useState } from 'react'
import { useUpdateBudgetAccountMutation } from 'app/services/budgets'
import { useSelector } from 'react-redux'
import { selectCurrentBudget } from 'app/slices/budget.slice'

import { toast } from 'react-toastify'
import BudgetAccountForm from 'features/budgetAccounts/BudgetAccountForm'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import EditIcon from '@mui/icons-material/Edit'

export default function EditBudgetAccountDropdownItem() {
    const [showModal, setShowModal] = useState(false)

    const budget = useSelector(selectCurrentBudget)
    const [updateBudgetAccount, { error }] = useUpdateBudgetAccountMutation()

    async function onSubmit(values) {
        try {
            await updateBudgetAccount(values)
                .unwrap()
            toast.success('Budget account updated')
            setShowModal(false)
        } catch {
            console.error('update budget account: submitting error')
        }
    }

    return (
        <>
        <NavDropdown.Item
            onClick={() => setShowModal(true)}
            className='text-success'
            disabled={!budget}
        >
            <EditIcon />
            &nbsp;
            {'Edit'}
        </NavDropdown.Item>
        
        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Edit budget account'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BudgetAccountForm
                    budget={budget}
                    onSubmit={onSubmit}
                    error={error}
                    buttonText='Edit'
                />
            </Modal.Body>
        </Modal>
        </>
    )
}