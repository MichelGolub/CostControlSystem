import { useState } from 'react'

import NavDropdown from 'react-bootstrap/NavDropdown'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'

export default function ChangeBudgetAccountDropdownItem() {

    const [showModal, setShowModal] = useState(false)

    const showModalForm = () => {
        setShowModal(true)
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
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">{'Loading...'}</span>
                    </Spinner>
                }
            </Modal.Body>
        </Modal>
        </>
    )
}