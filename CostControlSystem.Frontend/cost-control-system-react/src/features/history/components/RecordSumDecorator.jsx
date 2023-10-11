import Badge from 'react-bootstrap/Badge'

export { RecordSumDecorator }

function RecordSumDecorator({ sum = 1, ...props }) {
    return (
        <>
        {
            sum < 0 ?
            <Badge bg='danger' className='mx-2' {...props}>{'expense'}</Badge> : 
            <Badge bg='success' className='mx-2' {...props}>{'income'}&nbsp;</Badge>
        }
        {Math.abs(sum)}
        </>
    )
}