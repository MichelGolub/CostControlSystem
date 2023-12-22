import { useDispatch, useSelector } from 'react-redux'
import { categoriesActions } from 'store'

import { 
    ButtonCreateCategory,
    ButtonEditCategory, 
    ButtonDeleteCategory,
    CategoriesTable 
} from 'features/categories'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Controls = ({ categoryId }) => {
    return (
        <>
        <ButtonEditCategory
            categoryId={categoryId}
            className="mx-1"
        />
        <ButtonDeleteCategory
            categoryId={categoryId}
            className="mx-1"
        />
        </>
    )
}

export default function Categories() {
    const currentBudgetId = useSelector(x => x.budgets.currentBudget?.id)
    const { categories, isLoading } = useSelector(x => x.categories )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoriesActions.getAll(currentBudgetId))
    }, [currentBudgetId])

    return (
        <>
            <Row className="my-2 mx-1">
                <Col><h2>{'Categories'}</h2></Col>
                <Col>
                    <ButtonCreateCategory className='float-end' />
                </Col>
            </Row>
            <Row>
            {
                isLoading
                ? 
                    <Spinner className='mx-auto' animation="border" role="status">
                        <span className="visually-hidden">{'Loading...'}</span>
                    </Spinner>
                :
                <CategoriesTable 
                    categories={categories}
                    Controls={Controls}
                />
            }
            </Row>
        </>
    )
}