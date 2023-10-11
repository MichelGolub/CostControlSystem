import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { recordsActions } from 'store/records.slice'

import { RecordForm } from 'features/history' 

import Modal from 'react-bootstrap/Modal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

export { FloatingActionButtonAddRecord }

function FloatingActionButtonAddRecord({ ...props }) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

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
                    onSubmit={(payload) => dispatch(recordsActions.create(payload))}
                    onSubmitted={() => setShowModal(false)} 
                />
            </Modal.Body>
        </Modal>
        </>
    )
}
