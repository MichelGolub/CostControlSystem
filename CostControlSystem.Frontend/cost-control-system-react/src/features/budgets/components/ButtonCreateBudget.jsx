import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { BudgetForm } from './BudgetForm'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AddIcon from '@mui/icons-material/Add'

export { ButtonCreateBudget }

function ButtonCreateBudget({ title = 'Create', ...props }) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    return(
        <>
        <Button 
            onClick={() => {setShowModal(true)}}
            {...props}
        >
            <AddIcon fontSize='small' />
            &nbsp;
            {title}
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
                <BudgetForm
                    onSubmit={payload => console.log(payload)}
                    onSubmitted={() => setShowModal(false)}
                />
            </Modal.Body>
        </Modal>
        </>
    )
}