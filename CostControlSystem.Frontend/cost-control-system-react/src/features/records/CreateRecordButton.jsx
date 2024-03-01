import { useState } from 'react'
import { useAddRecordMutation } from 'app/services/records'
import { toast } from 'react-toastify'

import ButtonWithSpinner from 'components/ButtonWithSpinner'
import Modal from 'react-bootstrap/Modal'
import AddIcon from '@mui/icons-material/Add'
import RecordForm from 'features/records/RecordForm'

export default function CreateRecordButton({ ...props }) {
    const [showModal, setShowModal] = useState(false)

    const [addRecord, { isLoading, error }] = useAddRecordMutation()

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

    return (
        <>
        <ButtonWithSpinner
            isLoading={isLoading}
            Icon={AddIcon}
            text='Create'
            onClick={() => setShowModal(true)}
            {...props}
        />

        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Add new record'}</Modal.Title>
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