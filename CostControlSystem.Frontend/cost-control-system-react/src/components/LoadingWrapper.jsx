import { Spinner } from 'react-bootstrap'

export default function LoadingWrapper({
    isLoading = false,
    children
}) {

    if (isLoading) {
        return (
            <div className='d-flex justify-content-center'>
                <Spinner className='mx-auto' animation='border' role='status'>
                    <span className='visually-hidden'>{'Loading...'}</span>
                </Spinner>
            </div>
        )
    }

    return children
}
