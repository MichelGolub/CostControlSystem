import { BudgetForm } from './BudgetForm'

import Modal from 'react-bootstrap/Modal'

export { ModalBudgetForm }

function ModalBudgetForm({ 
    title = 'Create category',
    onSubmit = payload => console.log(payload),
    onSubmitted = () => {},
    ...props 
}) {

    return(
        <Modal
            animation={false}
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BudgetForm
                    onSubmit={onSubmit}
                    onSubmitted={onSubmitted}
                />
            </Modal.Body>
        </Modal>
    )
}