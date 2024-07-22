import { useState } from 'react'
import ButtonCollapse from 'components/ButtonCollapse'
import Collapse from 'react-bootstrap/Collapse'
import FilteringForm from './FilteringForm'

export default function FilteringOptions({
    isClosedDefault = false
}) {
    const [isOpen, setIsOpen] = useState(!isClosedDefault)

    return (
        <>
            <ButtonCollapse
                buttonText='Filtering options'
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            />
            <Collapse in={isOpen}>
                <div><FilteringForm /></div>
            </Collapse>
        </>
    )
}