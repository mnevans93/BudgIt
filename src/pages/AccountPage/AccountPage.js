import { useState, useEffect } from 'react'
import { update } from '../../utilities/users-service'
import NewTransactionForm from '../../components/NewTransactionForm/NewTransactionForm'
import TransactionTable from '../../components/TransactionTable/TransactionTable'
import TransactionModal from '../../components/TransactionModal/TransactionModal'
import AccountModal from '../../components/AccountModal/AccountModal'

export default function AccountPage ({ link, setLink, page, setPage, user, setUser, navigate, status, setStatus }) {
  const [account, setAccount] = useState({
    nickname: '',
    currentBalance: 0,
    transactions: [],
    type: '',
  })
  const [accIndex, setAccIndex] = useState(0)

  const [formData, setFormData] = useState({
    date: '',
    value: '',
    description: '',
    type: ''
  })

  const [showT, setShowT] = useState(false)
  const handleCloseT = () => setShowT(false)
  const handleShowT = () => setShowT(true)

  const [showA, setShowA] = useState(false)
  const handleCloseA = () => setShowA(false)
  const handleShowA = () => setShowA(true)
  
  const [operation, setOperation] = useState('edit')

  useEffect(() => {
    findAccount(link.substr(-24))
    setPage(`${account.type}: ${account.nickname}`)
  })

  const findAccount = (linkedId) => {
    for (const index in user.accounts) {
      if (user.accounts[index]._id === linkedId) {
        setAccount(user.accounts[index])
        setAccIndex(index)
      }
    }
  }

  const transactionSubmit = async (event) => {
    event.preventDefault()
    try {
      const userData = { ...user }
      const parsedBal = parseFloat(userData.accounts[accIndex].currentBalance)
      const parsedValue = parseFloat(formData.value)
      if (account.type === 'Bank Account') {
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

  const transactionEdit = async () => {

  }

  const transactionDelete = async () => {

  }

  const accountDelete = async () => {
    try {
      const userData = { ...user }
      userData.accounts.splice(accIndex, 1)
      setUser(await update(userData))
      setLink('/dashboard')
      setPage('My Dashboard')
      return navigate('/dashboard')
    } catch (error) {
      setStatus('Sorry, something went wrong. Try again later.')
    }
  }

  return (
    <main>
      <h1>{account.nickname}</h1>
      <h2>Current Balance: {account.type === 'Bank Account' ? <span>${account.currentBalance.toFixed(2)}</span> : <span className='no-stonks'>${account.currentBalance.toFixed(2)}</span>}</h2>
      <br />
      <h3>New Transaction</h3>
      <NewTransactionForm setFormData={setFormData} formData={formData} setStatus={setStatus} status={status} link={link} page={page} handleSubmit={transactionSubmit} />
      <h3>Transaction History</h3>
      <TransactionTable handleShow={handleShowT} setOperation={setOperation} user={user} accIndex={accIndex} renderAcc={false} link={link} page={page} />
      <TransactionModal operation={operation} show={showT} handleClose={handleCloseT} handleEdit={transactionEdit} handleDelete={transactionDelete} />
      <AccountModal show={showA} handleShow={handleShowA} handleClose={handleCloseA} handleDelete={accountDelete} />
    </main>
  )
}
