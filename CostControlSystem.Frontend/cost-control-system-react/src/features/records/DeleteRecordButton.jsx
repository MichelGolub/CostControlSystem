import { useState } from 'react'
import { useDeleteRecordMutation } from 'app/services/records'
import { toast } from 'react-toastify'

import DeleteIcon from '@mui/icons-material/Delete'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ButtonWithSpinner from 'components/ButtonWithSpinner'

export default function DeleteRecordButton({
    record,
    ...props
}) {
    const [showModal, setShowModal] = useState(false)

    const [deleteRecord, { isLoading }] = useDeleteRecordMutation()

    async function onDelete() {
        try {
            await deleteRecord(record.id)
                .unwrap()
            toast.success('Record deleted')
            setShowModal(false)
        } catch {
            console.error('delete record: submitting error')
        }
    }

    return (
        <>
        <Button
            onClick={() => setShowModal(true)}
            variant='danger'
            {...props}
        >
            <DeleteIcon />
            &nbsp;
            {'Delete'}
        </Button>
        
        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Delete record?'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {'Are you sure you want to delete record from '}
                <b>{record.date}</b>
                {' ?'}
            </Modal.Body>
            <Modal.Footer>
                <ButtonWithSpinner
                    isLoading={isLoading}
                    text='Delete'
                    onClick={onDelete}
                    variant='danger'
                    className='me-auto'
                />
                <Button 
                    variant='secondary'
                    onClick={() => setShowModal(false)}
                >
                    {'Cancel'}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}