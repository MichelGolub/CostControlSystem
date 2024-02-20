import CreateCategoryButton from 'features/categories/CreateCategoryButton'
import EditCategoryButton from 'features/categories/EditCategoryButton'
import DeleteCategoryButton from 'features/categories/DeleteCategoryButton'
import LoadingWrapper from 'components/LoadingWrapper'
import CategoriesTable from 'features/categories/CategoriesTable'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useGetCategoriesQuery } from 'app/services/categories'
import { useSelector } from 'react-redux'
import { selectCurrentBudgetId } from 'app/slices/budget.slice'

export default function Categories() {
    const currentBudgetAccountId = useSelector(selectCurrentBudgetId)
    const { data: categories, isFetching } = useGetCategoriesQuery(currentBudgetAccountId)

    return (
        <>
            <Row className='my-2 mx-1'>
                <Col><h2>{'Categories'}</h2></Col>
                <Col>
                    <CreateCategoryButton
                        className='float-end'
                    />
                </Col>
            </Row>
            <Row>
                <LoadingWrapper isLoading={isFetching}>
                    <CategoriesTable
                        categories={categories}
                        Controls={({category}) => (
                            <>
                                <EditCategoryButton
                                    className='mx-1'
                                    category={category}
                                />
                                <DeleteCategoryButton
                                    className='mx-1'
                                    category={category}
                                />
                            </>
                        )}
                    />
                </LoadingWrapper>
            </Row>
        </>
    )
}