import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

export { FormButtonConfirm } 

function FormButtonConfirm({ isSubmitting, text = 'Save', ...props }) {
    return(
        <Button
            disabled={isSubmitting}
            type="submit" 
            variant="primary"
            className="float-right"
            {...props}
        >
            {
                isSubmitting && 
                <Spinner className="mr-1"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            }
            {text}
        </Button>
    )
}