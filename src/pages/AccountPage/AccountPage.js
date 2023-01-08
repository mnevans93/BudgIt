import { useEffect } from 'react'

export default function AccountPage (props) {
    useEffect(() => {
        props.setPage(`Accounts: ${'ACCOUNT NAME HERE'}`)
    })
    
    return (
      <h1>Account Page</h1>
    )
  }
