import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

export default function ButtonWithSpinner({ 
    Icon,
    text = 'Ok',
    isLoading = false, 
    ...props
}) {
    return (
        <Button
            disabled={isLoading}
            variant='primary'
            {...props}
        >
            {
                isLoading 
                ? 
                    <>
                        <Spinner className='mr-1'
                            as='span'
                            animation='border'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                        />
                        &nbsp; 
                    </> 
                : 
                    !!Icon &&
                    <>
                        <Icon 
                            fontSize='small'
                            className='align-text-bottom'
                        />
                        &nbsp;
                    </>
            }
            {text}
        </Button>
    )
}