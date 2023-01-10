import { useState, useEffect } from 'react'
import { update } from '../../utilities/users-service'
import AccountListItem from '../../components/AccountListItem/AccountListItem'
import NewTransactionForm from '../NewTransactionForm/NewTransactionForm'
import Carousel from 'react-bootstrap/Carousel'

export default function AccountList ({ user, setUser, accounts, status, setStatus, link, page }) {
  
  const [formData, setFormData] = useState({
    date: '',
    value: '',
    description: '',
    type: ''
  })

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setStatus('')
  }, [activeIndex])

  const submitWrapper = i => event => {
    event.preventDefault()
    transactionSubmit(i)
  }

  const transactionSubmit = async (accIndex) => {
    try {
      const userData = { ...user }
      const parsedBal = parseFloat(userData.accounts[accIndex].currentBalance)
      const parsedValue = parseFloat(formData.value)
      applyTransaction(userData, accIndex, formData, parsedBal, parsedValue)
      userData.accounts[accIndex].transactions.push(formData)
      setUser(await update(userData))
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

  const applyTransaction = (userData, accIndex, formData, parsedBal, parsedValue) => {
    if (formData.type === 'Bank Account') {
      if (formData.type === 'Charge') {
        userData.accounts[accIndex].currentBalance = (parsedBal - parsedValue)
      } else {
        userData.accounts[accIndex].currentBalance = (parsedBal + parsedValue)
      }
    } else {
      if (formData.type === 'Charge') {
        userData.accounts[accIndex].currentBalance = (parsedBal + parsedValue)
      } else {
        userData.accounts[accIndex].currentBalance = (parsedBal - parsedValue)
      }
    }
  }

  return (
    <Carousel interval={null} indicators onSelect={setActiveIndex} activeIndex={activeIndex} >
      {accounts.map((el, i) => 
        <Carousel.Item key={el._id} >
          <AccountListItem nickname={el.nickname} type={el.type} currentBalance={el.currentBalance} />
          <NewTransactionForm formData={formData} setFormData={setFormData} status={status} setStatus={setStatus} link={link} page={page} handleSubmit={submitWrapper(i)} />
        </Carousel.Item>
      )}
    </Carousel>
  )
}
