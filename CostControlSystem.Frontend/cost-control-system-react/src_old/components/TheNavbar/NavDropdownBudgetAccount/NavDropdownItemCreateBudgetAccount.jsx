import { useState } from 'react'

import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import AddIcon from '@mui/icons-material/Add'

import { BudgetForm } from 'features/budgets'
import { useDispatch } from 'react-redux'
import { budgetsActions } from 'store'

export { NavDropdownItemCreateBudgetAccount }

function NavDropdownItemCreateBudgetAccount() {
    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()

    const onSubmit = (payload) => {
        return dispatch(budgetsActions.create(payload))
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
                <BudgetForm
                    onSubmit={onSubmit}
                    onSubmitted={() => setShowModal(false)}
                />
            </Modal.Body>
        </Modal>
        </>
    )
}