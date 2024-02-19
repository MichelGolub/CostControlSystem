import { useState } from 'react'
import { useAddBudgetAccountMutation } from 'app/services/budgets'
import { toast } from 'react-toastify'

import BudgetAccountForm from 'features/budgetAccounts/BudgetAccountForm'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import AddIcon from '@mui/icons-material/Add'

export default function CreateBudgetAccountDropdownItem() {
    const [showModal, setShowModal] = useState(false)

    const [addBudgetAccount, { error }] = useAddBudgetAccountMutation()

    async function onSubmit(values) {
        try {
            await addBudgetAccount(values)
                .unwrap()
            toast.success('Budget account created')
            setShowModal(false)
        } catch {
            console.error('add budget account: submitting error')
        }
    }

    return (
        <>
        <NavDropdown.Item
            onClick={() => setShowModal(true)}
            className='text-primary'
        >
            <AddIcon />
            &nbsp;
            {'New'}
        </NavDropdown.Item>
        
        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Create budget account'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BudgetAccountForm 
                    onSubmit={onSubmit}
                    error={error}
                />
            </Modal.Body>
        </Modal>
        </>
    )
}