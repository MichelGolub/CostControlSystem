import { useState } from 'react'
import { useAddBudgetAccountMutation } from 'app/services/budgets'
import { setCurrentBudget } from 'app/slices/budget.slice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import BudgetAccountForm from 'features/budgetAccounts/BudgetAccountForm'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import AddIcon from '@mui/icons-material/Add'

export default function CreateBudgetAccountDropdownItem() {
    const [showModal, setShowModal] = useState(false)

    const [addBudgetAccount, { error }] = useAddBudgetAccountMutation()
    const dispatch = useDispatch()

    async function onSubmit(values) {
        try {
            await addBudgetAccount(values)
                .unwrap()
                .then(id => {
                    const budget = { ...values, id }
                    dispatch(setCurrentBudget(budget))
                })
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