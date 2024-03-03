import { useSelector } from 'react-redux'
import { selectCurrentBudgetId } from 'app/slices/budget.slice'
import { useGetRecordsQuery } from 'app/services/records'

import CreateRecordButton from 'features/records/CreateRecordButton.jsx'
import EditRecordButton from 'features/records/EditRecordButton'
import DeleteRecordButton from 'features/records/DeleteRecordButton'
import RecordsTable from 'features/records/RecordsTable'
import LoadingWrapper from 'components/LoadingWrapper'
import FilteringOptions from 'features/records/FilteringOptions'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function History() {
    const currentBudgetAccountId = useSelector(selectCurrentBudgetId)
    const { data: records, isFetching } = useGetRecordsQuery(currentBudgetAccountId)

    return (
        <>
            <Row className='my-2 mx-1'>
                <Col><h2>{'History'}</h2></Col>
                <Col>
                    <CreateRecordButton
                        className='float-end'
                    />
                </Col>
            </Row>
            <Row>
                <FilteringOptions />
            </Row>
            <Row>
                <LoadingWrapper isLoading={isFetching}>
                    <RecordsTable
                        records={records}
                        Controls={({ record }) => (
                            <>
                                <EditRecordButton
                                    className='mx-1'
                                    record={record}
                                />
                                <DeleteRecordButton
                                    className='mx-1'
                                    record={record}
                                />
                            </>
                        )}
                    />
                </LoadingWrapper>
            </Row>
        </>
    )
}
