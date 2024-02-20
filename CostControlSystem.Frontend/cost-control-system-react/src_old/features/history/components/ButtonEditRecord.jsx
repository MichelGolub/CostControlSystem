import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { recordsActions } from 'store/records.slice'

import { RecordForm } from './RecordForm'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import EditIcon from '@mui/icons-material/Edit'

export { ButtonEditRecord }

function ButtonEditRecord({ record, ...props }) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    return(
        <>
        <Button 
            variant='success'
            onClick={() => {setShowModal(true)}}
            {...props}
        >
            <EditIcon fontSize='small'/>
            &nbsp;
            {'Edit'}
        </Button>

        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Edit record'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RecordForm
                    record={record}
                    onSubmit={(payload) => dispatch(recordsActions.update(payload))}
                    onSubmitted={() => setShowModal(false)}
                />
            </Modal.Body>
        </Modal>
        </>
    )
}