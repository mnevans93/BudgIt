import { useState, useEffect } from 'react'
import { update } from '../../utilities/users-service'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

export default function NewTransactionForm (props) {
  const [formData, setFormData] = useState({
    date: '',
    value: '',
    description: '',
    type: ''
  })
  const [disable, setDisable] = useState(true)
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
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
  }, [props.link, props.page])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userData = { ...props.user }
      const parsedBal = parseFloat(userData.accounts[props.accIndex].currentBalance).toFixed(2)
      const parsedValue = parseFloat(formData.value).toFixed(2)
      userData.accounts[props.accIndex].currentBalance = parsedBal - parsedValue
      userData.accounts[props.accIndex].transactions.push(formData)
      props.setUser(await update(userData))
      setStatus('New transaction created!')
      setFormData({
        date: '',
        value: '',
        description: '',
        type: ''
      })
    } catch (error) {
      setStatus('Sorry, something went wrong. Try again later.')
    }
  }

  return (
    <Form className='new-transaction' onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group className='mb-3' controlId='formDate'>
            <Form.Label>Transaction Date</Form.Label>
            <Form.Control type='date' name='date' value={formData.date} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3' controlId='formValue'>
            <Form.Label>Transaction Value</Form.Label>
            <Form.Control type='number' name='value' value={formData.value} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label>Transaction Description</Form.Label>
            <Form.Control type='text' name='description' value={formData.description} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label>Transaction Type</Form.Label>
            <Form.Select name='type' value={formData.type} onChange={handleChange} required>
              <option />
              <option>Charge</option>
              <option>Debit</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Button variant='primary' type='submit' disabled={disable}>CREATE NEW TRANSACTION</Button>
      <br /><p className='error-message'>&nbsp;{status}</p>
    </Form>
  )
}
