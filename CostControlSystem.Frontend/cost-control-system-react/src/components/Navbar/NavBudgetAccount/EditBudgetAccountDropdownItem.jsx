import { useState } from 'react'

import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import EditIcon from '@mui/icons-material/Edit'

export default function EditBudgetAccountDropdownItem() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <NavDropdown.Item
            onClick={() => setShowModal(true)}
            className='text-success'
            disabled={!false}
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
                <span>Form</span>
            </Modal.Body>
        </Modal>
        </>
    )
}