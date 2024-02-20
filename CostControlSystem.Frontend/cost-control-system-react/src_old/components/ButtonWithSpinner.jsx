import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

export { ButtonWithSpinner } 

function ButtonWithSpinner({ isLoading, text = 'Ok', ...props }) {
    return(
        <Button
            disabled={isLoading}
            variant='primary'
            {...props}
        >
            {
                isLoading && 
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