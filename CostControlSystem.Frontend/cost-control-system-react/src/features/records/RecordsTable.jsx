import Table from 'react-bootstrap/Table'
import SumBadge from 'components/SumBadge'
import moment from 'moment'

//todo вынести обертку таблицы
export default function RecordsTable({ 
    records = [],
    Controls,
    dateFormat = 'DD.MM.YYYY',
    ...props 
}) {

    if (!records.length) {
        return <span>{'There is no records'}</span>
    }

    return (
        <Table className='text-center' {...props}>
            <thead>
                <tr>
                    <th>{'№'}</th>
                    <th>{'Sum'}</th>
                    <th>{'Category'}</th>
                    <th>{'Date'}</th>
                    {!!Controls && <th></th>}
                </tr>
            </thead>
            <tbody>
            {
                records.map((record, index) => 
                    <tr key={index} className='align-middle'>
                        <td>{index + 1}</td>
                        <td><SumBadge sum={record.sum} /></td>
                        <td>{record.category.name}</td>
                        <td>{moment(record.date).format(dateFormat).toString()}</td>
                        {
                            !!Controls &&
                            <td className='text-end'>
                                <Controls record={flattenRecord(record)} />
                            </td>
                        }
                    </tr>
                )
            }
            </tbody>
        </Table>
    )
}

function flattenRecord(record) {
    return {
        categoryId: record.category?.id,
        ...record
    }
}
