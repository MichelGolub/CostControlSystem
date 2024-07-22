import Button from 'react-bootstrap/Button'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'

export default function ButtonCollapse({
    buttonText = 'Show',
    isOpen,
    ...props
}) {
    return (
        <>
            <Button
                variant='secondary'
                aria-controls='collapse-content'
                aria-expanded={isOpen}
                {...props}
            >
                {
                    isOpen ? <>
                        <UnfoldMoreIcon />&nbsp;
                        {buttonText}&nbsp;
                        <UnfoldMoreIcon />
                    </> : <>
                        <UnfoldLessIcon />&nbsp;
                        {buttonText}&nbsp;
                        <UnfoldLessIcon />
                    </>
                }
            </Button>
        </>
    )
}