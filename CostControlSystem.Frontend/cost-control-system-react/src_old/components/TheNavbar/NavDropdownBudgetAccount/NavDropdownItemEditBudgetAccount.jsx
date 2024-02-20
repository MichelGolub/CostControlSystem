import { useState } from 'react'

import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import EditIcon from '@mui/icons-material/Edit'

import { BudgetForm } from 'features/budgets'
import { useDispatch, useSelector } from 'react-redux'
import { budgetsActions } from 'store'

export { NavDropdownItemEditBudgetAccount }

function NavDropdownItemEditBudgetAccount() {
    const [showModal, setShowModal] = useState(false)

    const { currentBudget } = useSelector(x => x.budgets)

    const dispatch = useDispatch()

    const onSubmit = (payload) => {
        return dispatch(budgetsActions.update(payload))
    }

    return (
        <>
        <NavDropdown.Item
            onClick={() => setShowModal(true)}
            className='text-success'
            disabled={!currentBudget}
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
                <BudgetForm
                    budget={currentBudget}
                    onSubmit={onSubmit}
                    onSubmitted={() => setShowModal(false)}
                />
            </Modal.Body>
        </Modal>
        </>
    )
}