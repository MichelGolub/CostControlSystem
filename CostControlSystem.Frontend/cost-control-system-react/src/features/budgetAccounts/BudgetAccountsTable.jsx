import Table from 'react-bootstrap/Table'

export default function BudgetAccountsTable({ 
    budgets = [],
    Controls,
    ...props }) {

    if (!budgets.length) {
        return <span>{'There is no budget accounts'}</span>
    }

    return (
        <Table className='text-center' {...props}>
            <thead>
                <tr>
                    <th>{'№'}</th>
                    <th>{'Name'}</th>
                    {!!Controls && <th></th>}
                </tr>
            </thead>
            <tbody>
            {
                budgets.map((budget, index) => 
                    <tr key={budget.id} className='align-middle'>
                        <td>{index + 1}</td>
                        <td>{budget.name}</td>
                        {
                            !!Controls &&
                            <td className='text-end'>
                                <Controls budget={budget} />
                            </td>
                        }
                    </tr>
                )
            }
            </tbody>
        </Table>
    )
}