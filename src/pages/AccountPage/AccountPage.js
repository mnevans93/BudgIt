import { useState, useEffect } from 'react'
import NewTransactionForm from '../../components/NewTransactionForm/NewTransactionForm'
import TransactionTable from '../../components/TransactionTable/TransactionTable'

export default function AccountPage (props) {
  const [account, setAccount] = useState({
    nickname: '',
    currentBalance: 0,
    transactions: []
  })
  const [accIndex, setAccIndex] = useState(0)

  useEffect(() => {
    findAccount(props.link.substr(-24))
    props.setPage(`Accounts: ${account.nickname}`)
  })

  const findAccount = (linkedId) => {
    for (const index in props.user.accounts) {
      if (props.user.accounts[index]._id === linkedId) {
        setAccount(props.user.accounts[index])
        setAccIndex(index)
      }
    }
  }

  return (
    <main>
      <h1>{account.nickname}</h1>
      <h2>Current Balance: {account.currentBalance.toFixed(2)}</h2>
      <br />
      <h3>New Transaction</h3>
      <NewTransactionForm user={props.user} setUser={props.setUser} link={props.link} page={props.page} accIndex={accIndex} />
      <br />
      <h3>Transaction History</h3>
      <TransactionTable user={props.user} setUser={props.setUser} link={props.link} page={props.page} transactions={account.transactions} accIndex={accIndex} renderAcc={false} />
    </main>
  )
}
