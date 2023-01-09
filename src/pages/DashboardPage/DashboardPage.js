import { useEffect } from 'react'
import NewAccountForm from '../../components/NewAccountForm/NewAccountForm'

export default function DashboardPage (props) {
  useEffect(() => {
    props.setPage("My Dashboard")
  }, [])

  const accounts = props.user.accounts
  
  return (
    props.user.accounts.length !== 0 ?
      <main>
        <h1>Dashboard Page</h1>
      </main>
    :
      <main>
        <h1>Looks like you don't have any accounts set up. Let's create one!</h1>
        <br />
        <NewAccountForm user={props.user} setUser={props.setUser} getUser={props.getUser} link={props.link} setLink={props.setLink} navigate={props.navigate}  />
      </main>
  )
}
