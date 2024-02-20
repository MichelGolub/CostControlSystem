import Table from 'react-bootstrap/Table'

export { BudgetsTable }

function BudgetsTable({ budgets = [], Controls, ...props }) {

    if (!budgets.length) {
        return 'There is no budgets'
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
                                <Controls budgetId={budget.id} />
                            </td>
                        }
                    </tr>
                )
            }
            </tbody>
        </Table>
    )
}