import { useState, useEffect } from 'react'
import validInput from '../../utilities/check-input'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

export default function NewTransactionForm ( { setFormData, formData, setStatus, status, link, page, handleSubmit }) {
  const [disable, setDisable] = useState(true)

  const handleChange = (event) => {
    if (validInput(event, 'description')) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      })
    }
    if (formData.date && formData.value && formData.type) {
      setDisable(false)
    } else { setDisable(true) }
  }

  useEffect(() => {
    if (formData.date && formData.value && formData.type) {
      setDisable(false)
    } else { setDisable(true) }
  }, [formData])

  useEffect(() => {
    setStatus('')
  }, [link, page])

  return (
    <Form className='new-transaction' onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group className='mb-3' controlId='formDate'>
            <Form.Label className='hide-sm'>Date</Form.Label>
            <Form.Control type='date' name='date' value={formData.date} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label className='hide-sm'>Type</Form.Label>
            <Form.Select name='type' value={formData.type} onChange={handleChange} required>
              <option />
              <option>Charge</option>
              <option>Debit</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3' controlId='formValue'>
            <Form.Label className='hide-sm'>Value</Form.Label>
            <Form.Control type='number' name='value' value={formData.value} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label className='hide-sm'>Description</Form.Label>
            <Form.Control type='text' name='description' value={formData.description} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>
      <Button variant='primary' type='submit' disabled={disable}>CREATE NEW TRANSACTION</Button>
      <br /><p>&nbsp;{status}</p>
    </Form>
  )
}
