import { useState } from 'react'
import { useGetBudgetAccountsQuery } from 'app/services/budgets'

import LoadingWrapper from 'components/LoadingWrapper'
import BudgetAccountsTable from 'features/budgetAccounts/BudgetAccountsTable'

import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'

export default function ChangeBudgetAccountDropdownItem() {
    const [showModal, setShowModal] = useState(false)

    const { data: budgets, isFetching } = useGetBudgetAccountsQuery()

    return (
        <>
        <NavDropdown.Item
            onClick={() => setShowModal(true)}
        >
            <ChangeCircleIcon />
            &nbsp;
            {'Change'}
        </NavDropdown.Item>
        
        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Change budget account'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                <LoadingWrapper isLoading={isFetching}>
                    <BudgetAccountsTable budgets={budgets} />
                </LoadingWrapper>
            }
            </Modal.Body>
        </Modal>
        </>
    )
}