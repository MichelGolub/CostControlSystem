import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'

export default function ButtonCollapse({ 
    children, 
    buttonText = 'Show',
    isOpenDefault = false,
    ...props 
}) {
    const [open, setOpen] = useState(isOpenDefault)

    return (
        <>
        <Button
            onClick={() => setOpen(!open)}
            variant='secondary'
            aria-controls='collapse-content'
            aria-expanded={open}
            {...props}
        >
        {
            open ? <>
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
        <Collapse in={open}>
            <div id='collapse-content'>
                {children}
            </div>
        </Collapse>
        </>
    )
}