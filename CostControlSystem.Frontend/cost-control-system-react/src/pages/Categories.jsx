import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CreateCategoryButton from 'features/categories/CreateCategoryButton'
import LoadingWrapper from 'components/LoadingWrapper'

export default function Categories() {
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
                <LoadingWrapper isLoading={true}>

                </LoadingWrapper>
            </Row>
        </>
    )
}