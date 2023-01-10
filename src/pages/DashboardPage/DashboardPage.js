import { useEffect } from 'react'
import NewAccountForm from '../../components/NewAccountForm/NewAccountForm'

export default function DashboardPage (props) {
  useEffect(() => {
    props.setPage('My Dashboard')
  }, [])

  const accounts = props.user.accounts

  return (
    accounts.length !== 0
      ? <main>
          <h1>Dashboard Page</h1>
        </main>
      : <main className='static'>
          <h1>Looks like you don't have any accounts set up. Let's create one!</h1>
          <br />
          <NewAccountForm user={props.user} setUser={props.setUser} setLink={props.setLink} setPage={props.setPage} navigate={props.navigate} status={props.status} setStatus={props.setStatus} onDashboard={true} />
      </main>
  )
}
