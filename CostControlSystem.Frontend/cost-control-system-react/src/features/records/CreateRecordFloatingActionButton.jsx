import { useState } from 'react'
import { useAddRecordMutation } from 'app/services/records'
import { toast } from 'react-toastify'

import RecordForm from 'features/records/RecordForm' 
import Modal from 'react-bootstrap/Modal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

export default function CreateRecordFloatingActionButton({ ...props }) {
    const [showModal, setShowModal] = useState(false)

    const [addRecord, { error }] = useAddRecordMutation()

    async function onSubmit(values) {
        console.log(values)
        try {
            await addRecord(values)
                .unwrap()
            toast.success('Record created')
            setShowModal(false)
        } catch {
            console.error('add record: submitting error')
        }
    }

    const renderTooltip = (props) => (
        <Tooltip id='fab-tooltip' {...props}>
            {'New record'}
        </Tooltip>
    )

    return (
        <>
        <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <Fab
                size='large'
                color='primary'
                aria-label='addRecord'
                className='position-fixed bottom-0 end-0 me-2 mb-3'
                onClick={() => {setShowModal(true)}}
                {...props}
            >
                <AddIcon />
            </Fab>
        </OverlayTrigger>

        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Create record'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RecordForm
                    onSubmit={onSubmit}
                    error={error}
                    buttonText='Add record'
                />
            </Modal.Body>
        </Modal>
        </>
    )
}