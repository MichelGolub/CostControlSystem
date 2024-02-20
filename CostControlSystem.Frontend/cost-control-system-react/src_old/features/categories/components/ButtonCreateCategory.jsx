import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { categoriesActions } from 'store'

import { CategoryForm } from './CategoryForm'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AddIcon from '@mui/icons-material/Add'

export { ButtonCreateCategory }

function ButtonCreateCategory({ ...props }) {
    const [showModal, setShowModal] = useState(false)
    
    const currentBudgetId = useSelector(x => x.budgets.currentBudget?.id)
    const dispatch = useDispatch()

    const onSubmit = (payload) => {
        return dispatch(categoriesActions.create(payload))
    }

    return(
        <>
        <Button 
            onClick={() => {setShowModal(true)}}
            {...props}
        >
            <AddIcon fontSize='small' />
            &nbsp;
            {'Create'}
        </Button>

        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Create category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm
                    category={{ budgetAccountId: currentBudgetId }}
                    onSubmit={onSubmit}
                    onSubmitted={() => setShowModal(false)}
                />
            </Modal.Body>
        </Modal>
        </>
    )
}