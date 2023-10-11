import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { CategoryForm } from './CategoryForm'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AddIcon from '@mui/icons-material/Add'

export { ButtonCreateCategory }

function ButtonCreateCategory({ ...props }) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    return(
        <>
        <Button 
            onClick={() => {setShowModal(true)}}
            {...props}
        >
            <AddIcon fontSize='small' />
            &nbsp;
            {'Create'}
        </Button>

        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Create category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm
                    onSubmit={payload => console.log(payload)}
                    onSubmitted={() => setShowModal(false)}
                />
            </Modal.Body>
        </Modal>
        </>
    )
}