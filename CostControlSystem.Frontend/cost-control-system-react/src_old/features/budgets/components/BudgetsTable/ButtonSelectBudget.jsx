import Button from 'react-bootstrap/Button'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { useDispatch, useSelector } from 'react-redux'
import { budgetsActions } from 'store'

export { ButtonSelectBudget }

function ButtonSelectBudget({ budgetId, ...props }) {
    const { currentBudget } = useSelector(x => x.budgets)
    const dispatch = useDispatch()

    const selectBudget = () => {
        dispatch(budgetsActions.setCurrentBudgetById(budgetId))
    }

    return (
        <Button
            onClick={selectBudget}
            disabled={budgetId === currentBudget?.id}
            {...props}
        >
            <ChangeCircleIcon fontSize='small' />
            &nbsp;
            {'Select'}
        </Button>
    )
}