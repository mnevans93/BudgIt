import { useState, useEffect } from 'react'

export default function AccountPage (props) {
    const [account, setAccount] = useState({
      nickname: '',
      currentBalance: 0
    })

    useEffect(() => {
        findAccount(props.link.substr(-24))
        props.setPage(`Accounts: ${account.nickname}`)
    })

    const findAccount = (linkedId) => {
      for (const account in props.user.accounts) {
        if (props.user.accounts[account]._id === linkedId) {
          setAccount(props.user.accounts[account])
        }
      }
    }
    
    return (
      <main>
        <h1>{account.nickname}</h1>
        <h2>Current Balance: ${account.currentBalance.toFixed(2)}</h2>
      </main>
    )
  }
