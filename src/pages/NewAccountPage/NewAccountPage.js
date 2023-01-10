import { useEffect } from 'react'
import NewAccountForm from '../../components/NewAccountForm/NewAccountForm'

export default function NewAccountPage (props) {
  useEffect(() => {
    props.setPage('Set Up a New Account')
  })

  return (
    props.user.accounts.length !== 0
      ? <main>
        <h1>Have another account to add? Enter it below!</h1>
        <br />
        <NewAccountForm user={props.user} setUser={props.setUser} getUser={props.getUser} link={props.link} setLink={props.setLink} setPage={props.setPage} navigate={props.navigate} status={props.status} setStatus={props.setStatus} />
        </main>
      : <main>
        <h1>Looks like you don't have any accounts set up. Let's create one!</h1>
        <br />
        <NewAccountForm user={props.user} setUser={props.setUser} getUser={props.getUser} link={props.link} setLink={props.setLink} setPage={props.setPage} navigate={props.navigate} status={props.status} setStatus={props.setStatus} />
      </main>
  )
}
