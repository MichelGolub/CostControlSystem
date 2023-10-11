import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import DeleteIcon from '@mui/icons-material/Delete'

export { ButtonDeleteRecord }

function ButtonDeleteRecord({ recordId, ...props }) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    function onDelete() {
        console.log(recordId)
        setShowModal(false)
    }

    return (
        <>
        <Button 
            variant='danger'
            onClick={() => setShowModal(true)}
            {...props}
        >
            <DeleteIcon fontSize='small' />
            &nbsp;
            {'Delete'}
        </Button>

        <Modal
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Confirmation'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{'Delete record?'}</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant='secondary' 
                    onClick={() => setShowModal(false)}
                >
                    {'Cancel'}
                </Button>
                <Button 
                    variant='primary' 
                    onClick={onDelete}
                >
                    {'Confirm'}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}