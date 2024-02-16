import { selectCurrentBudgetId, setCurrentBudget } from 'app/slices/budget.slice'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'

export default function SelectBudgetAccountButton({  
    budget,
    ...props
}) {
    const currentBudgetId = useSelector(selectCurrentBudgetId)
    const dispatch = useDispatch()

    const selectBudget = () => {
        dispatch(setCurrentBudget(budget))
    }

    return (
        <Button
            onClick={selectBudget}
            disabled={budget.id === currentBudgetId}
            {...props}
        >
            <ChangeCircleIcon fontSize='small' />
            &nbsp;
            {'Select'}
        </Button>
    )
}