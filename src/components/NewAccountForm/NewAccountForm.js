import { useState } from 'react'
import { update } from '../../utilities/users-service'
import validInput from '../../utilities/check-input'
import generateDate from '../../utilities/generate-date'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function NewAccountForm ({ user, setUser, setLink, setPage, navigate, status, setStatus, onDashboard }) {
  const [accInfo, setAccInfo] = useState({
    nickname: '',
    type: '',
    initBalance: '',
    transactions: [],
    currentBalance: 0
  })
  const [disable, setDisable] = useState(true)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!checkIfUnique()) {
      setStatus('You already have an account with that nickname. Account was not created.')
      return
    }
    try {
      accInfo.currentBalance = accInfo.initBalance
      const initType = accInfo.type === 'Bank Account' ? 'Debit' : 'Charge'
      const date = generateDate()
      accInfo.transactions.push({
        date: date,
        value: accInfo.initBalance,
        description: 'Initial balance',
        type: initType
      })
      const userData = { ...user }
      const accNickname = accInfo.nickname
      userData.accounts.push(accInfo)
      setUser(await update(userData))
      setStatus(`New account "${accNickname}" created! Add another account or navigate back to your Dashboard.`) 
      setAccInfo({
        nickname: '',
        type: '',
        initBalance: '',
        transactions: [],
        currentBalance: 0
      })
      setLink('/accounts/new/')
      setPage('Set Up a New Account')
      if (onDashboard) return navigate('/accounts/new/')
    } catch (error) {
      setStatus('Sorry, something went wrong. Try again later.')
    }
  }

  const handleChange = (event) => {
    if (validInput(event, 'nickname')) {
      setAccInfo({
        ...accInfo,
        [event.target.name]: event.target.value
      })
    }
    if (accInfo.nickname !== '' && accInfo.type !== '') {
      setDisable(false)
    } else { setDisable(true) }
  }

  const checkIfUnique = () => {
    for (const acc in user.accounts) {
      if (accInfo.nickname === user.accounts[acc].nickname) {
        return false
      }
    }
    return true
  }

  return (
    <>
      <br />
      <Form className='text-center' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formNickname'>
          <Form.Label>Nickname</Form.Label>
          <Form.Control type='text' name='nickname' value={accInfo.nickname} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formType'>
          <Form.Label>Type</Form.Label>
          <Form.Select name='type' value={accInfo.type} onChange={handleChange} required>
            <option />
            <option>Bank Account</option>
            <option>Credit Card</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formInitBalance'>
          <Form.Label>Initial Balance</Form.Label>
          <Form.Control type='number' name='initBalance' value={accInfo.initBalance} onChange={handleChange} required />
        </Form.Group>
        <h4 className='warning-message'>Do not include sensitive information such as bank account or credit card numbers!</h4>
        <br />
        <Button variant='primary' type='submit' disabled={disable}>CREATE ACCOUNT</Button>
        <br /><br /> <h4>&nbsp;{status}</h4>
      </Form>
    </>
  )
}
