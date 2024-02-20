import Table from 'react-bootstrap/Table'
import { ButtonEditCategory } from './ButtonEditCategory'
import { ButtonDeleteCategory } from './ButtonDeleteCategory'

export { CategoriesTable }

function CategoriesTable({ categories = [], Controls, ...props }) {

    if (!categories.length) {
        return 'There is no categories'
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
                                <Controls categoryId={category.id} />
                            </td>
                        }
                    </tr>    
                )
            }
            </tbody>
        </Table>
    )
}