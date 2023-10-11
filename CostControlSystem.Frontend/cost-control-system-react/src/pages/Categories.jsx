import { ButtonCreateCategory } from 'features/categories'
import { CategoriesTable } from 'features/categories'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const categories = [
    {
        id: '1',
        name: 'Food'
    },
    {
        id: '2',
        name: 'Electronics'
    },
    {
        id: '3',
        name: 'Clothes'
    }
]

export default function Categories() {
    return (
        <>
            <Row className="my-2 mx-1">
                <Col><h2>{'Categories'}</h2></Col>
                <Col>
                    <ButtonCreateCategory className='float-end' />
                </Col>
            </Row>

            <CategoriesTable 
                categories={categories}
                editButton
                deleteButton 
            />
        </>
    )
}