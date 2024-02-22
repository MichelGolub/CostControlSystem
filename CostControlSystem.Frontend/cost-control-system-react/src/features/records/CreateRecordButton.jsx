import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentBudgetId } from 'app/slices/budget.slice'
import { useAddRecordMutation } from 'app/services/records'
import { toast } from 'react-toastify'

import ButtonWithSpinner from 'components/ButtonWithSpinner'
import Modal from 'react-bootstrap/Modal'
import AddIcon from '@mui/icons-material/Add'
import RecordForm from 'features/records/RecordForm'

export default function CreateRecordButton({ ...props }) {
    const [showModal, setShowModal] = useState(false)

    const currentBudgetId = useSelector(selectCurrentBudgetId)
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
            <Modal.Header>
                <Modal.Title>{'Add new record'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RecordForm
                    onSubmit={onSubmit}
                    error={error}
                    buttonText='Add record'
                    record={{ budgetAccountId: currentBudgetId }}
                />
            </Modal.Body>
        </Modal>
        </>
    )
}