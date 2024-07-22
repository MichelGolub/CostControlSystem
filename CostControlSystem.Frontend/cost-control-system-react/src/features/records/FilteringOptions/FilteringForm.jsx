import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

export default function FilteringForm() {
    const [radioValue, setRadioValue] = useState('1')
    const radios = [
        { name: 'None', value: 0 },
        { name: 'Income', value: 1 },
        { name: 'Outcome', value: -1 }
    ]

    /*
    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type='radio'
                                variant={idx % 2 ? 'success' : 'danger'}
                                name='radio'
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
    */
    return (
        <Form>
            <Row>
                <Col>

                    <Form.Group className='mb-3'>
                        <Form.Check
                            //{...register('isIncome')}
                            type='switch'
                            label='income'
                        />
                    </Form.Group>
                </Col>
            </Row>


        </Form>
    )
}