import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { budgetsActions } from 'store'

import NavDropdown from 'react-bootstrap/NavDropdown'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'

import { BudgetsTable } from 'features/budgets'
import { ButtonSelectBudget } from 'features/budgets'

export { NavDropdownItemChangeBudgetAccount }

//todo useCallback - добавить закрывание моадльного окна
const Controls = ({ budgetId }) => (
    <ButtonSelectBudget
        budgetId={budgetId}
        className="mx-1"
    />
) 

function NavDropdownItemChangeBudgetAccount() {
    const { budgets, isLoading } = useSelector(x => x.budgets)
    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)

    const showModalForm = () => {
        setShowModal(true)
        dispatch(budgetsActions.getAll())
    }

    return (
        <>
        <NavDropdown.Item
            onClick={showModalForm}
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
                    isLoading
                    ? 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">{'Loading...'}</span>
                    </Spinner>
                    : 
                    <BudgetsTable 
                        Controls={Controls} 
                        budgets={budgets}
                    />
                }
            </Modal.Body>
        </Modal>
        </>
    )
}