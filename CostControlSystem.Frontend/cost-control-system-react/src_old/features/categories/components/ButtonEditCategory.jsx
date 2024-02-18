import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { categoriesActions } from 'store'

import { CategoryForm } from './CategoryForm'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import EditIcon from '@mui/icons-material/Edit'
import { Spinner } from 'react-bootstrap'

export { ButtonEditCategory }

function ButtonEditCategory({ categoryId, ...props }) {
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { category } = useSelector(x => x.categories)
    const dispatch = useDispatch()

    const loadCategory = () => {
        setShowModal(true)
        setIsLoading(true)
        dispatch(categoriesActions.getById(categoryId))
        .then(() => {
            setIsLoading(false)
        })
    }

    const onSubmit = (payload) => {
        dispatch(categoriesActions.update(payload))
    }

    return(
        <>
        <Button 
            onClick={loadCategory}
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
                {
                    isLoading
                    ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">{'Loading...'}</span>
                    </Spinner>
                    :
                    <CategoryForm
                        category={category}
                        onSubmit={onSubmit}
                        onSubmitted={() => setShowModal(false)}
                    />
                }
            </Modal.Body>
        </Modal>
        </>
    )
}