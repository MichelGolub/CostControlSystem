import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { CategoryForm } from './CategoryForm'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import EditIcon from '@mui/icons-material/Edit'

export { ButtonEditCategory }

function ButtonEditCategory({ category, ...props }) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    return(
        <>
        <Button 
            onClick={() => {setShowModal(true)}}
            variant='success'
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
                <Modal.Title>{'Edit category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm
                    category={category}
                    onSubmit={payload => console.log(payload)}
                    onSubmitted={() => setShowModal(false)}
                />
            </Modal.Body>
        </Modal>
        </>
    )
}