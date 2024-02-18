import Table from 'react-bootstrap/Table'
import { RecordSumDecorator } from './RecordSumDecorator'
import { ButtonEditRecord } from './ButtonEditRecord'
import { ButtonDeleteRecord } from './ButtonDeleteRecord'

import moment from 'moment'

export { RecordsTable }

function RecordsTable({ 
    records = [],
    dateFormat = 'DD.MM.YYYY',
    editButton = false,
    deleteButton = false,
    ...props 
}) {

    const flattenRecord = (record) => ({
        categoryId: record.category?.id,
        ...record
    })

    if (!records.length) {
        return 'There is no records'
    }

    return (
        <Table className='text-center' {...props}>
            <thead>
                <tr>
                    <th>{'№'}</th>
                    <th>{'Sum'}</th>
                    <th>{'Category'}</th>
                    <th>{'Date'}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                records.map((record, index) => 
                    <tr key={index} className='align-middle'>
                        <td>{index + 1}</td>
                        <td><RecordSumDecorator sum={record.sum} /></td>
                        <td>{record.category.name}</td>
                        <td>{moment(record.date).format(dateFormat).toString()}</td>
                        <td className='text-end'>
                        {
                            editButton &&
                            <ButtonEditRecord
                                record={flattenRecord(record)}
                                className='mx-1' 
                            />
                        }
                        {
                            deleteButton &&
                            <ButtonDeleteRecord
                                recordId={record.id}
                                className='mx-1' 
                            />
                        }
                        </td>
                    </tr>    
                )
            }
            </tbody>
        </Table>
    )
}
