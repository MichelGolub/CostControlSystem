import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export { PlanItem }

function PlanItem({ current = 0, plan }) {
    const progress = current / plan.limit

    return (
        <Row>
            <Col sm={3} className='text-truncate'>
                {plan.category.name}
            </Col>
            <Col sm={7}>
                <ProgressBar 
                    now={100 * progress} 
                    label={current}
                    variant={getVariant(progress)}
                />
            </Col>
            <Col sm={2}>
                {plan.limit}
            </Col>
        </Row> 
    )
}

function getVariant(progress) {
    if (progress <= 0.25) {
        return 'info'
    }
    if (progress <= 0.5) {
        return 'success'
    }
    if (progress <= 0.85) {
        return 'warning'
    }
    return 'danger'
}