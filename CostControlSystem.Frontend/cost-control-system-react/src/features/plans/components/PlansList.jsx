import { PlanItem } from './PlanItem'

export { PlansList }

function PlansList({ plans = [] }) {

    if (!plans.length) {
        return 'There is no plans'
    }

    return (
        plans.map((plan, index) => 
            <PlanItem key={index} plan={plan} current={Math.floor(Math.random() * plan.limit)} />
        )
    )
}