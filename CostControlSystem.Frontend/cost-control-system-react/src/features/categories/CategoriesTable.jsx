import Table from 'react-bootstrap/Table'

export default function CategoriesTable({ 
    categories = [],
    Controls,
    ...props 
}) {

    if (!categories.length) {
        return <span>{'There is no categories'}</span>
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
                categories.map((category, index) => 
                    <tr key={category.id} className='align-middle'>
                        <td>{index + 1}</td>
                        <td>{category.name}</td>
                        {
                            !!Controls &&
                            <td className='text-end'>
                                <Controls category={category} />
                            </td>
                        }
                    </tr>    
                )
            }
            </tbody>
        </Table>
    )
}