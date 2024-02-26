import Badge from 'react-bootstrap/Badge'

export default function SumBadge({ sum = 1, ...props }) {
    return (
        <>
        {
            sum < 0 ?
            <Badge bg='danger' className='mx-2' {...props}>{'expense'}</Badge> : 
            <Badge bg='success' className='mx-2' {...props}>{'income'}</Badge>
        }
        {Math.abs(sum)}
        </>
    )
}