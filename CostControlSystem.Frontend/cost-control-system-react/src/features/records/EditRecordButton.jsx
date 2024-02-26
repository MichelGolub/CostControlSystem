import { useState } from 'react'
import { useUpdateRecordMutation } from 'app/services/records'

import { toast } from 'react-toastify'
import RecordForm from 'features/records/RecordForm'
import Modal from 'react-bootstrap/Modal'
import EditIcon from '@mui/icons-material/Edit'
import Button from 'react-bootstrap/Button'

export default function EditRecordButton({
    record,
    ...props
}) {
    const [showModal, setShowModal] = useState(false)

    const [updateRecord, { error }] = useUpdateRecordMutation()

    async function onSubmit(values) {
        try {
            await updateRecord(values)
                .unwrap()
            toast.success('Record updated')
            setShowModal(false)
        } catch {
            console.error('update record: submitting error')
        }
    }

    return (
        <>
        <Button
            onClick={() => setShowModal(true)}
            variant='success'
            {...props}
        >
            <EditIcon />
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
                    onSubmit={onSubmit}
                    error={error}
                    buttonText='Edit'
                />
            </Modal.Body>
        </Modal>
        </>
    )
}