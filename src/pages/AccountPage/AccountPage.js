import { useEffect } from 'react'

export default function AccountPage (props) {
    useEffect(() => {
        props.setPage("Account Name Here")
    })
    return (
      <h1>Account Page</h1>
    )
  }
