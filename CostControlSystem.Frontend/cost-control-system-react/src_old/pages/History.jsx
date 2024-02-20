import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const records = [
    { id: 0, date: '2023-07-14', sum: 77, category: { id: 2,name: 'electronics' } },
    { id: 1, date: '2023-07-03', sum: -61, category: { id: 1, name: 'clothes' } },
    { id: 2, date: '2023-07-01', sum: -54, category: { id: 0, name: 'food' } },
    { id: 3, date: '2023-07-13', sum: 56, category: { id: 2, name: 'electronics' } },
    { id: 4, date: '2023-07-15', sum: 58, category: { id: 0, name: 'food' } },
    { id: 5, date: '2023-07-15', sum: -68, category: { id: 1, name: 'clothes' } },
    { id: 6, date: '2023-07-06', sum: 70, category: { id: 0, name: 'food' } },
    { id: 7, date: '2023-07-08', sum: -62, category: { id: 2, name: 'electronics' } },
    { id: 8, date: '2023-07-14', sum: -67, category: { id: 1, name: 'clothes' } },
    { id: 9, date: '2023-07-16', sum: -13, category: { id: 2, name: 'electronics' } }
]

export default function Records() {
    return <div>Records</div>
}

/*
export default function Records() {
    return (
        <>
            <Row className="my-2 mx-1">
                <Col><h2>{'Records'}</h2></Col>
                <Col>
                    <ButtonCreateRecord className='float-end' />
                </Col>
            </Row>

            <RecordsTable
                records={records} 
                editButton
                deleteButton
            />
        </>
    )
}
*/