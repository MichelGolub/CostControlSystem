import Table from 'react-bootstrap/Table'
import { ButtonEditCategory } from './ButtonEditCategory'
import { ButtonDeleteCategory } from './ButtonDeleteCategory'

export { CategoriesTable }

function CategoriesTable({
    categories = [],
    editButton = false,
    deleteButton = false,
    ...props 
}) {

    if (!categories.length) {
        return 'There is no categories'
    }

    return (
        <Table className='text-center' {...props}>
            <thead>
                <tr>
                    <th>{'№'}</th>
                    <th>{'Name'}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                categories.map((category, index) => 
                    <tr key={category.id} className='align-middle'>
                        <td>{index + 1}</td>
                        <td>{category.name}</td>
                        <td className='text-end'>
                        {
                            editButton &&
                            <ButtonEditCategory
                                catgory={category}
                                className='mx-1' 
                            />
                        }
                        {
                            deleteButton &&
                            <ButtonDeleteCategory
                                categoryId={category.id}
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