import { PlansList, ButtonCreatePlan } from 'features/plans'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const plans = [
    { id: 0, category: { id: 0, name: 'food' }, limit: 10000 },
    { id: 1, category: { id: 1, name: 'clothes' }, limit: 5000 },
    { id: 2, category: { id: 2, name: 'electronics' }, limit: 7600 },
    { id: 3, category: { id: 3, name: 'Очень длинное название для категории' }, limit: 1000000000 }
]

export default function Plans() {
    return (
        <>
        <Row className="my-2 mx-1">
            <Col><h2>{'Planning'}</h2></Col>
            <Col>
                <ButtonCreatePlan className='float-end' />
            </Col>
        </Row>

        <Row>
            <PlansList plans={plans}/>
        </Row>
        </>
    )
}