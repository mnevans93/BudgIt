import { useState, useEffect } from 'react'
import AccountList from '../../components/AccountList/AccountList'
import NewAccountForm from '../../components/NewAccountForm/NewAccountForm'

export default function DashboardPage (props) {
  useEffect(() => {
    props.setPage('My Dashboard')
  }, [])

  const [accounts, setAccounts] = useState(props.user.accounts)
  useEffect(() => {
    setAccounts(props.user.accounts)
  }, [props.user])

  return (
    accounts.length !== 0
      ? <main className="carousel-container">
          <AccountList user={props.user} setUser={props.setUser} accounts={accounts} status={props.status} setStatus={props.setStatus} link={props.link} page={props.page} />
        </main>
      : <main>
          <h1>Looks like you don't have any accounts set up. Let's create one!</h1>
          <br />
          <NewAccountForm user={props.user} setUser={props.setUser} setLink={props.setLink} setPage={props.setPage} navigate={props.navigate} status={props.status} setStatus={props.setStatus} onDashboard={true} />
      </main>
  )
}
